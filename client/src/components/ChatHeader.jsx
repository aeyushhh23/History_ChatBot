import React from 'react';
import { Compass, Menu, Sparkles, Zap } from 'lucide-react';

export default function ChatHeader({ onToggleSidebar }) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 h-14 border-b border-ink-850/50 bg-ink-950/70 backdrop-blur-md flex-shrink-0 z-30">
      {/* Left: sidebar toggle + brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 -ml-2 rounded-lg text-ink-400 hover:text-ink-200 hover:bg-ink-800/40 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-accent-500/10 border border-accent-500/15 flex items-center justify-center">
            <Compass className="w-4 h-4 text-accent-500" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-semibold text-ink-100 tracking-tight leading-none">
              Historica
            </h1>
            <p className="text-2xs text-ink-500 mt-0.5">Historical Intelligence</p>
          </div>
        </div>
      </div>

      {/* Right: model indicators */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-ink-900/60 border border-ink-800/40">
          <Zap className="w-3 h-3 text-emerald-400/70" />
          <span className="text-2xs text-ink-400 font-medium">RAG</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-ink-900/60 border border-ink-800/40">
          <Sparkles className="w-3 h-3 text-accent-400/70" />
          <span className="text-2xs text-ink-400 font-medium">Gemini</span>
        </div>
      </div>
    </header>
  );
}
