import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ErrorBanner({ error, onDismiss }) {
  if (!error) return null;

  return (
    <div
      role="alert"
      className="absolute top-3 left-3 right-3 z-30 animate-fade-in-down"
    >
      <div className="bg-ink-950/95 border border-burgundy-700/30 rounded-lg p-4 shadow-2xl shadow-black/40 backdrop-blur-sm flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-burgundy-700/15 flex items-center justify-center flex-shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4 text-burgundy-400" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-ink-100">{error.title}</h3>
          <p className="text-xs text-ink-300 mt-1 leading-relaxed whitespace-pre-line">
            {error.message}
          </p>
          {error.instructions && (
            <div className="mt-2.5 bg-ink-900/60 rounded-md px-3 py-2 border border-ink-800/50">
              <p className="text-2xs uppercase tracking-wider text-ink-400 font-medium mb-1">
                Troubleshooting
              </p>
              <p className="text-xs text-ink-300 font-mono leading-relaxed whitespace-pre-line">
                {error.instructions}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={onDismiss}
          className="text-ink-400 hover:text-ink-200 p-1 rounded-md hover:bg-ink-800/50 transition-colors flex-shrink-0"
          aria-label="Dismiss error"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
