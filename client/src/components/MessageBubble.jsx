import React, { useState } from 'react';
import { BookOpen, FileText, Copy, Check, ChevronDown } from 'lucide-react';

function SourceChip({ source }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent-500/6 border border-accent-500/10 text-2xs text-accent-400 font-medium">
      <FileText className="w-2.5 h-2.5 text-accent-500/60" />
      <span className="truncate max-w-[120px]">{source}</span>
    </span>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard API may fail silently */
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="copy-btn p-1.5 rounded-md text-ink-400 hover:text-ink-200 hover:bg-ink-800/50 transition-all"
      title={copied ? 'Copied!' : 'Copy response'}
      aria-label="Copy response text"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-400" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  );
}

export default function MessageBubble({ message }) {
  const isUser = message.sender === 'user';
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const hasSources = !isUser && message.sources && message.sources.length > 0;

  if (isUser) {
    return (
      <div className="flex justify-end animate-msg-in">
        <div className="max-w-[80%] sm:max-w-[70%] lg:max-w-[60%]">
          <div className="bg-accent-600/90 text-white px-4 py-2.5 rounded-2xl rounded-br-md shadow-lg shadow-accent-950/20">
            <p className="text-sm leading-relaxed">{message.text}</p>
          </div>
        </div>
      </div>
    );
  }

  // AI Message — editorial layout
  return (
    <div className="animate-msg-in msg-container max-w-2xl group">
      {/* AI label row */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-accent-500/10 flex items-center justify-center">
            <BookOpen className="w-3 h-3 text-accent-500" />
          </div>
          <span className="text-2xs uppercase tracking-wider text-ink-400 font-medium">
            Historica
          </span>
        </div>
        <CopyButton text={message.text} />
      </div>

      {/* Response body */}
      <div className="pl-7">
        <div className="text-sm text-ink-200 leading-[1.75] whitespace-pre-wrap">
          {message.text}
        </div>

        {/* Sources */}
        {hasSources && (
          <div className="mt-4 pt-3 border-t border-ink-850/60">
            <button
              onClick={() => setSourcesOpen(!sourcesOpen)}
              className="flex items-center gap-1.5 text-xs text-ink-400 hover:text-accent-400 transition-colors group/src"
            >
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  sourcesOpen ? 'rotate-0' : '-rotate-90'
                }`}
              />
              <span className="font-serif italic text-xs tracking-wide">
                Sources cited ({message.sources.length})
              </span>
            </button>

            {sourcesOpen && (
              <div className="flex flex-wrap gap-1.5 mt-2 animate-fade-in">
                {message.sources.map((src, i) => (
                  <SourceChip key={i} source={src} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
