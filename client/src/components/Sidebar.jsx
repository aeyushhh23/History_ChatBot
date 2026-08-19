import React from 'react';
import {
  FileText,
  ArrowRight,
  Compass,
  X,
  BookOpen,
  HelpCircle,
} from 'lucide-react';

const INCLUDED_DOCUMENTS = [
  { name: 'french_revolution.md', title: 'The French Revolution', range: '1789–1799' },
  { name: 'world_war_ii.md', title: 'World War II', range: '1939–1945' },
  { name: 'roman_empire.md', title: 'The Roman Empire', range: '27 BC–476 AD' },
  { name: 'indian_independence.md', title: 'Indian Independence', range: '1857–1947' },
  { name: 'cold_war.md', title: 'The Cold War', range: '1947–1991' },
];

const QUICK_QUESTIONS = [
  { topic: 'Roman Empire', query: 'Who was the last Western Roman Emperor and when did it collapse?' },
  { topic: 'French Revolution', query: 'What events led to the Reign of Terror and how did it end?' },
  { topic: 'World War II', query: 'What key turning points altered the course of World War II?' },
  { topic: 'Indian Independence', query: 'What was the Salt March and who led it?' },
  { topic: 'Cold War', query: 'What was the Cuban Missile Crisis and how was it resolved?' },
];

export default function Sidebar({ isOpen, onClose, onSend, loading }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
          w-72 lg:w-64 xl:w-72
          bg-ink-950 lg:bg-ink-950/50
          border-r border-ink-850/40
          flex flex-col
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        role="complementary"
        aria-label="Sidebar navigation"
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-ink-850/40 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-accent-500/60" />
            <span className="text-xs font-semibold text-ink-300 uppercase tracking-wider">
              Knowledge Base
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md text-ink-400 hover:text-ink-200 hover:bg-ink-800/40 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {/* Source Documents */}
          <section>
            <div className="flex items-center gap-1.5 mb-3">
              <FileText className="w-3.5 h-3.5 text-ink-500" />
              <h2 className="text-2xs uppercase tracking-wider text-ink-500 font-semibold">
                Source Documents
              </h2>
            </div>

            <div className="space-y-1">
              {INCLUDED_DOCUMENTS.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-ink-900/50 transition-colors group"
                >
                  {/* Timeline dot */}
                  <div className="relative flex flex-col items-center">
                    <div className="timeline-dot" />
                    {idx < INCLUDED_DOCUMENTS.length - 1 && (
                      <div className="timeline-line h-6 mt-0.5 absolute top-full" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-ink-200 font-medium truncate group-hover:text-ink-100 transition-colors">
                      {doc.title}
                    </p>
                    <p className="text-2xs text-ink-500 mt-0.5">{doc.range}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="divider" />

          {/* Quick Questions */}
          <section>
            <div className="flex items-center gap-1.5 mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-ink-500" />
              <h2 className="text-2xs uppercase tracking-wider text-ink-500 font-semibold">
                Quick Questions
              </h2>
            </div>

            <div className="space-y-1">
              {QUICK_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onSend(q.query);
                    onClose();
                  }}
                  disabled={loading}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-ink-900/50 transition-colors group flex items-start gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ArrowRight className="w-3 h-3 text-ink-600 mt-0.5 flex-shrink-0 group-hover:text-accent-400 group-hover:translate-x-0.5 transition-all" />
                  <div className="min-w-0">
                    <span className="block text-2xs text-accent-500/60 uppercase tracking-wider font-medium mb-0.5">
                      {q.topic}
                    </span>
                    <span className="text-xs text-ink-400 group-hover:text-ink-300 transition-colors leading-relaxed line-clamp-2">
                      {q.query}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar footer */}
        <div className="px-4 py-3 border-t border-ink-850/40 flex-shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-ink-600" />
            <p className="text-2xs text-ink-600 italic font-serif">
              RAG-powered · Source-grounded answers
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
