import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';

const PROMPT_SUGGESTIONS = [
  {
    era: '27 BC – 476 AD',
    topic: 'Roman Empire',
    query: 'Who was the last Western Roman Emperor and when did it collapse?',
  },
  {
    era: '1789 – 1799',
    topic: 'French Revolution',
    query: 'What events led to the Reign of Terror and how did it end?',
  },
  {
    era: '1857 – 1947',
    topic: 'Indian Independence',
    query: 'What was the Salt March and who led it?',
  },
  {
    era: '1939 – 1945',
    topic: 'World War II',
    query: 'What key turning points altered the course of World War II?',
  },
  {
    era: '1947 – 1991',
    topic: 'Cold War',
    query: 'What was the Cuban Missile Crisis and how was it resolved?',
  },
  {
    era: 'Cross-era',
    topic: 'Comparative',
    query: 'How did geopolitical tensions evolve from WWII into the Cold War?',
  },
];

export default function EmptyState({ onSend, loading }) {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full animate-fade-in-up">
        {/* Brand mark */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-accent-500/8 border border-accent-500/15 flex items-center justify-center">
            <Compass className="w-6 h-6 text-accent-500/70" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-center font-serif text-3xl sm:text-4xl font-semibold text-ink-100 tracking-tight text-balance leading-tight">
          Ask History Anything
        </h1>

        <p className="text-center text-sm text-ink-400 mt-3 max-w-md mx-auto leading-relaxed text-pretty">
          Explore civilizations, conflicts, and pivotal moments through an
          intelligent research assistant grounded in curated historical sources.
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 my-8">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-500/20" />
          <div className="timeline-dot" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-500/20" />
        </div>

        {/* Prompt cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PROMPT_SUGGESTIONS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => onSend(p.query)}
              disabled={loading}
              className="prompt-card text-left bg-ink-900/50 border border-ink-800/50 hover:border-accent-500/20 rounded-lg px-3.5 py-3 group disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="era-badge">{p.era}</span>
                <ArrowRight className="w-3 h-3 text-ink-600 group-hover:text-accent-400 transition-colors group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs text-ink-300 group-hover:text-ink-200 leading-relaxed transition-colors line-clamp-2">
                {p.query}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
