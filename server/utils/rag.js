import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateEmbedding, cosineSimilarity } from './embeddings.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VECTORSTORE_PATH = path.join(__dirname, '../data/vectorstore.json');

let vectorStore = null;

/**
 * Loads vector store file into memory.
 * Returns true on success, false otherwise.
 */
export function loadVectorStore() {
  try {
    if (fs.existsSync(VECTORSTORE_PATH)) {
      const rawData = fs.readFileSync(VECTORSTORE_PATH, 'utf-8');
      vectorStore = JSON.parse(rawData);
      console.log(`Vector store loaded into memory successfully. (${vectorStore.length} chunks)`);
      return true;
    } else {
      console.warn(`Vector store file not found at ${VECTORSTORE_PATH}.`);
      vectorStore = null;
      return false;
    }
  } catch (error) {
    console.error('Failed to load vector store:', error);
    vectorStore = null;
    return false;
  }
}

/**
 * Gets the loaded vector store or attempts to load it.
 */
export function getVectorStore() {
  if (vectorStore === null) {
    loadVectorStore();
  }
  return vectorStore;
}

/**
 * Retreives top K chunks from the vector store matching the query.
 * @param {string} query - User question.
 * @param {number} topK - Number of matching chunks to retrieve.
 * @returns {Promise<Object[]>} - Array of top matching chunks.
 */
export async function retrieveRelevantChunks(query, topK = 4) {
  const store = getVectorStore();
  if (!store || store.length === 0) {
    throw new Error('Vector store is not initialized or empty. Please run "npm run ingest" first.');
  }

  // Generate embedding for the question
  const queryEmbedding = await generateEmbedding(query);

  // Compute similarities
  const scoredChunks = store.map(chunk => {
    const similarity = cosineSimilarity(queryEmbedding, chunk.embedding);
    return {
      text: chunk.text,
      source: chunk.source,
      similarity
    };
  });

  // Sort descending by similarity score
  scoredChunks.sort((a, b) => b.similarity - a.similarity);

  // Return the top K items
  return scoredChunks.slice(0, topK);
}

/**
 * Queries Ollama local instance for answer generation using retrieved context.
 * @param {string} question - User question.
 * @returns {Promise<{ answer: string, sources: string[] }>}
 */
export async function generateRAGResponse(question) {
  // Retrieve top 4 matching chunks
  const relevantChunks = await retrieveRelevantChunks(question, 4);

  // Combine content from retrieved chunks
  const context = relevantChunks
    .map((chunk, index) => `[Document ${index + 1} - Source: ${chunk.source}]\n${chunk.text}`)
    .join('\n\n');

  // Format system prompt as requested:
  const systemPrompt = `You are HistoryGPT, a precise history assistant. Answer ONLY using the CONTEXT below. Do not use outside knowledge. If the context lacks the answer, say "I don't have enough information in my sources to answer that." Cite sources by document name after your answer.

CONTEXT:
${context}

QUESTION:
${question}

Respond in this format:
Answer: <answer>
Sources: <comma separated document names used>`;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('GEMINI_KEY_MISSING');
  }

  console.log('Sending query to Gemini API (gemini-1.5-flash)...');

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text() || '';

    // Parse the output according to the expected format
    let answer = '';
    let sources = [];

    const answerMatch = responseText.match(/Answer:\s*([\s\S]*?)(?=Sources:|$)/i);
    const sourcesMatch = responseText.match(/Sources:\s*([\s\S]*?)$/i);

    if (answerMatch) {
      answer = answerMatch[1].trim();
    } else {
      // Fallback: If format parsing fails, use the whole response text
      answer = responseText.trim();
    }

    if (sourcesMatch) {
      sources = sourcesMatch[1]
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0 && s.toLowerCase() !== 'none' && s.toLowerCase() !== 'n/a');
    }

    // Fallback: If no sources were parsed but we have matches, default to the sources of the matched chunks
    if (sources.length === 0 && relevantChunks.length > 0) {
      // Only include sources if we found an answer (i.e. not the "I don't have enough information" string)
      const noInfoKeywords = ["don't have enough information", "don't have information", "insufficient information", "do not have enough information"];
      const isNoInfo = noInfoKeywords.some(keyword => answer.toLowerCase().includes(keyword));
      
      if (!isNoInfo) {
        // Unique sources from retrieved chunks
        sources = [...new Set(relevantChunks.map(c => c.source))];
      }
    }

    return { answer, sources };

  } catch (error) {
    if (error.message === 'GEMINI_KEY_MISSING') {
      throw error;
    }
    console.error('Gemini API request failed:', error);
    throw new Error('GEMINI_API_ERROR');
  }
}
