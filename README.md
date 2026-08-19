# History Q&A RAG Chatbot

A complete, fully local History Q&A Chatbot application using Retrieval-Augmented Generation (RAG). It uses React + Vite + Tailwind CSS for the frontend, Node.js + Express for the backend, `@xenova/transformers` for local embedding generation, and Ollama (running the `llama3.1` model) for LLM generation. 

No external paid API keys or signups are required.

## Features
- **Local Embeddings**: Generates document chunks and embeddings locally using `@xenova/transformers` (with the `all-MiniLM-L6-v2` model).
- **Local LLM**: Generates precise historical answers using Ollama running `llama3.1` locally.
- **Local Vector Storage**: Implements a simple file-based JSON store for calculating cosine similarity and retrieval.
- **Interactive Chat Interface**: A polished, responsive UI featuring dynamic messages, loading states, and collapsible source listings.

## Setup Instructions

### 1. Install & Prepare Ollama
1. Download and install Ollama from [ollama.com](https://ollama.com/).
2. Pull the required llama3.1 model:
   ```bash
   ollama pull llama3.1
   ```
3. Make sure the Ollama local server is running:
   ```bash
   ollama serve
   ```

### 2. Ingest History Documents and Start Backend Server
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ingest documents and pre-generate embeddings:
   ```bash
   npm run ingest
   ```
4. Start the Express server:
   ```bash
   npm start
   ```
   The backend server will run on `http://localhost:5000`.

### 3. Run Frontend React Client
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.
