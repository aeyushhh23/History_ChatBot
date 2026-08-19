import React from 'react';
import { BookOpen } from 'lucide-react';

export default function LoadingIndicator() {
  return (
    <div className="animate-msg-in max-w-2xl">
      {/* Label */}
      <div className="flex items-center gap-2 mb-2 px-1">
        <div className="w-5 h-5 rounded-md bg-accent-500/10 flex items-center justify-center">
          <BookOpen className="w-3 h-3 text-accent-500" />
        </div>
        <span className="text-2xs uppercase tracking-wider text-ink-400 font-medium">
          Historica
        </span>
      </div>

      {/* Shimmer block */}
      <div className="pl-7 space-y-2.5">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1 items-center">
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent-500/70 animate-typing-dot"
              style={{ animationDelay: '0ms' }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent-500/70 animate-typing-dot"
              style={{ animationDelay: '200ms' }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent-500/70 animate-typing-dot"
              style={{ animationDelay: '400ms' }}
            />
          </div>
          <span className="text-xs text-ink-400">Researching sources…</span>
        </div>
        <div className="shimmer-line h-3 w-4/5" />
        <div className="shimmer-line h-3 w-3/5" />
        <div className="shimmer-line h-3 w-2/3" />
      </div>
    </div>
  );
}
