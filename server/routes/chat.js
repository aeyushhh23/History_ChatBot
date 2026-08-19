import express from 'express';
import { generateRAGResponse, getVectorStore } from '../utils/rag.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  const { question } = req.body;

  // 1. Validate empty question
  if (!question || typeof question !== 'string' || question.trim() === '') {
    return res.status(400).json({
      error: 'Question is empty. Please provide a valid historical question.'
    });
  }

  // 2. Validate empty vectorstore
  const store = getVectorStore();
  if (!store || store.length === 0) {
    return res.status(503).json({
      error: 'Vector store is empty or not loaded. Please run the ingestion script ("npm run ingest" in the server directory) before asking questions.'
    });
  }

  try {
    // 3. Generate response using local RAG setup
    const response = await generateRAGResponse(question.trim());
    return res.json(response);
  } catch (error) {
    console.error('Error handling chat request:', error.message);

    // 4. Handle Gemini connection/key issues specifically
    if (error.message === 'GEMINI_KEY_MISSING') {
      return res.status(503).json({
        error: 'Gemini Key Missing',
        message: 'The GEMINI_API_KEY environment variable is not configured. Please add it to your server/.env file.'
      });
    }

    if (error.message === 'GEMINI_API_ERROR') {
      return res.status(503).json({
        error: 'Gemini API Error',
        message: 'Failed to communicate with the Gemini API. Please check your internet connection and verify that your API key is valid.'
      });
    }

    // 5. Handle any other general server errors
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message || 'An unexpected error occurred while processing your request.'
    });
  }
});

export default router;
