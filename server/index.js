import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRouter from './routes/chat.js';
import { loadVectorStore } from './utils/rag.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from absolute path
dotenv.config({ path: path.join(__dirname, '.env') });
console.log('GEMINI API KEY LOADED:', process.env.GEMINI_API_KEY ? 'Yes (length: ' + process.env.GEMINI_API_KEY.length + ')' : 'No');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with support for frontend client origin
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Body parser middleware
app.use(express.json());

// API Routes setup
app.use('/api', chatRouter);

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'History Chatbot Server is running.' });
});

// Serve the built React frontend
const clientDist = path.join(__dirname, '../client/dist');
app.use(express.static(clientDist));

// Fallback: serve index.html for any non-API route (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

// Start server after initializing the in-memory vector store
const startServer = () => {
  console.log('Initializing Vector Store...');
  const isLoaded = loadVectorStore();
  
  if (isLoaded) {
    console.log('Vector store initialized successfully on start.');
  } else {
    console.warn('Vector store file could not be loaded. Please run "npm run ingest" to build it.');
  }

  app.listen(PORT, () => {
    console.log(`History Chatbot Server listening at http://localhost:${PORT}`);
  });
};

startServer();
