import React, { useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ChatComposer({ inputValue, setInputValue, onSubmit, loading }) {
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 160) + 'px';
    }
  }, [inputValue]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  const canSend = inputValue.trim().length > 0 && !loading;

  return (
    <div className="border-t border-ink-850/60 bg-ink-950/80 backdrop-blur-sm px-4 py-3 sm:px-6 sm:py-4">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={onSubmit} className="relative">
          <div className="flex items-end gap-2 bg-ink-900/80 border border-ink-800/60 rounded-xl input-glow transition-all duration-200">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              rows={1}
              placeholder={
                loading
                  ? 'Researching…'
                  : 'Ask about history…'
              }
              className="flex-1 bg-transparent px-4 py-3 text-sm text-ink-100 placeholder-ink-500 focus:outline-none resize-none disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] max-h-[160px]"
              aria-label="Type your history question"
            />

            <div className="flex items-center gap-1 pr-2 pb-2">
              {/* Keyboard hint */}
              <span className="hidden sm:inline text-2xs text-ink-600 mr-1 select-none">
                {inputValue.trim() ? '⏎ Send' : 'Shift+⏎ newline'}
              </span>

              <button
                type="submit"
                disabled={!canSend}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  canSend
                    ? 'bg-accent-500 hover:bg-accent-400 text-white shadow-lg shadow-accent-500/20 active:scale-95'
                    : 'bg-ink-800/50 text-ink-600 cursor-not-allowed'
                }`}
                title="Send message"
                aria-label="Send message"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        <p className="text-center text-2xs text-ink-600 mt-2 font-serif italic select-none">
          Answers sourced exclusively from curated historical documents
        </p>
      </div>
    </div>
  );
}
