import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateEmbedding } from '../utils/embeddings.js';

// Resolve directory paths in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCUMENTS_DIR = path.join(__dirname, '../documents');
const OUTPUT_DIR = path.join(__dirname, '../data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'vectorstore.json');

/**
 * Splits text into chunks based on word count with a specified overlap.
 * @param {string} text - The input text to chunk.
 * @param {number} chunkSize - Maximum words per chunk.
 * @param {number} overlap - Overlapping words between consecutive chunks.
 * @returns {string[]} - Array of text chunks.
 */
function splitIntoChunks(text, chunkSize = 400, overlap = 50) {
  // Normalize whitespace and split by space
  const words = text.trim().replace(/\s+/g, ' ').split(' ');
  if (words.length <= chunkSize) {
    return [text];
  }

  const chunks = [];
  let i = 0;
  while (i < words.length) {
    const chunkWords = words.slice(i, i + chunkSize);
    chunks.push(chunkWords.join(' '));
    i += (chunkSize - overlap);
  }
  return chunks;
}

async function runIngestion() {
  console.log('--- Starting Document Ingestion Pipeline ---');
  
  try {
    // Ensure output data directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
      console.log(`Created output directory: ${OUTPUT_DIR}`);
    }

    // Read all markdown files from server/documents
    if (!fs.existsSync(DOCUMENTS_DIR)) {
      throw new Error(`Documents directory does not exist: ${DOCUMENTS_DIR}`);
    }

    const files = fs.readdirSync(DOCUMENTS_DIR).filter(file => file.endsWith('.md'));
    if (files.length === 0) {
      console.warn('No markdown (.md) documents found to ingest.');
      return;
    }

    console.log(`Found ${files.length} document(s) to process: ${files.join(', ')}`);

    const vectorStore = [];

    for (const file of files) {
      const filePath = path.join(DOCUMENTS_DIR, file);
      console.log(`\nProcessing file: ${file}`);
      
      const content = fs.readFileSync(filePath, 'utf-8');
      const chunks = splitIntoChunks(content, 400, 50);
      console.log(`- Split into ${chunks.length} chunk(s)`);

      for (let index = 0; index < chunks.length; index++) {
        const chunkText = chunks[index];
        const chunkId = `${path.parse(file).name}-chunk-${index}`;
        
        console.log(`- Generating embedding for chunk ${index + 1}/${chunks.length}...`);
        const embedding = await generateEmbedding(chunkText);

        vectorStore.push({
          id: chunkId,
          text: chunkText,
          embedding: embedding,
          source: file
        });
      }
    }

    console.log(`\nWriting ${vectorStore.length} vector records to ${OUTPUT_FILE}...`);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(vectorStore, null, 2), 'utf-8');
    console.log('--- Ingestion Pipeline Completed Successfully! ---');
  } catch (error) {
    console.error('Ingestion failed with error:', error);
    process.exit(1);
  }
}

// Execute the ingestion
runIngestion();
