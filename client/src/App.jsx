import React, { useState, useRef, useEffect } from 'react';

// Components
import ChatHeader from './components/ChatHeader';
import Sidebar from './components/Sidebar';
import EmptyState from './components/EmptyState';
import MessageBubble from './components/MessageBubble';
import ChatComposer from './components/ChatComposer';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorBanner from './components/ErrorBanner';

export default function App() {
  // ─── State (preserved identically from original) ─────────────────
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const chatEndRef = useRef(null);

  // Auto-scroll to the bottom of the chat area on message update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // ─── API logic (preserved identically from original) ─────────────
  const handleSend = async (queryText) => {
    const question = queryText || inputValue;
    if (!question.trim() || loading) return;

    // Add user message to history
    const userMessage = {
      id: Date.now() + '-user',
      sender: 'user',
      text: question.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);
    setError(null);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${apiBaseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: question.trim() })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Server error occurred');
      }

      // Add bot response to history
      const botMessage = {
        id: Date.now() + '-bot',
        sender: 'bot',
        text: data.answer,
        sources: data.sources || []
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Error calling chat API:', err);
      
      const isConnectionFailed = err.message.includes('Failed to fetch') || err.message.includes('NetworkError');
      
      setError({
        title: isConnectionFailed ? 'Backend Server Unreachable' : 'Gemini API or Configuration Error',
        message: isConnectionFailed 
          ? 'The Express server could not be reached. Make sure it is running on http://localhost:5000.'
          : err.message,
        instructions: isConnectionFailed
          ? 'Open a terminal in the /server directory and run "npm start".'
          : 'Please check that: \n1. A valid GEMINI_API_KEY is configured in your server/.env file.\n2. You have run document ingestion ("npm run ingest" in the server directory).'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  // ─── Derived state ───────────────────────────────────────────────
  const hasMessages = messages.length > 0;

  // ─── Render ──────────────────────────────────────────────────────
  return (
    <div className="h-screen flex bg-ink-950 text-ink-100 font-sans">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSend={handleSend}
        loading={loading}
      />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <ChatHeader onToggleSidebar={() => setSidebarOpen(prev => !prev)} />

        {/* Error banner */}
        <ErrorBanner error={error} onDismiss={() => setError(null)} />

        {/* Chat content */}
        {!hasMessages && !loading ? (
          <EmptyState onSend={handleSend} loading={loading} />
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              {loading && <LoadingIndicator />}

              <div ref={chatEndRef} />
            </div>
          </div>
        )}

        {/* Chat input */}
        <ChatComposer
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSubmit={handleFormSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
