import { pipeline } from '@xenova/transformers';

let extractorInstance = null;

/**
 * Initializes and returns the feature extraction pipeline.
 * Uses the Xenova/all-MiniLM-L6-v2 model for local execution.
 */
export async function getExtractor() {
  if (!extractorInstance) {
    extractorInstance = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  return extractorInstance;
}

/**
 * Generates an embedding array for the provided text.
 * @param {string} text - The input text to embed.
 * @returns {Promise<number[]>} - A promise resolving to the vector array.
 */
export async function generateEmbedding(text) {
  try {
    const extractor = await getExtractor();
    // Use mean pooling and normalize to get unit-length vectors.
    const output = await extractor(text, { pooling: 'mean', normalize: true });
    
    // Convert the Float32Array from the Tensor object into a standard JS Array.
    return Array.from(output.data);
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

/**
 * Computes the cosine similarity between two numeric vectors of equal length.
 * @param {number[]} vecA
 * @param {number[]} vecB
 * @returns {number} - Cosine similarity between 0 and 1.
 */
export function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) {
    throw new Error(`Vector dimension mismatch: ${vecA.length} vs ${vecB.length}`);
  }
  
  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  if (normA === 0 || normB === 0) {
    return 0.0;
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
