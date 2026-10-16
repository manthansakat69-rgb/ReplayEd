import React from 'react';
import { ShieldAlert, FileText, ArrowRight } from 'lucide-react';

export default function LockedScreen({
  isLocked = false,
  onViewResults,
  warningCount = 3,
  maxWarnings = 3,
}) {
  if (!isLocked) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fade-in font-sans">
      <div className="max-w-md w-full rounded-3xl bg-zinc-950 border border-red-900/60 shadow-2xl p-6 sm:p-8 text-center text-zinc-100 space-y-5">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-red-950/60 border border-red-700/60 flex items-center justify-center text-red-400 shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">
            Assessment Status
          </span>
          <h2 className="text-2xl font-extrabold text-white">
            Session Flagged for Human Review
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            The assessment threshold of {maxWarnings} integrity warnings was reached.
            In accordance with examination policy, your current answers have been automatically
            saved and submitted for trainer review.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 space-y-1 text-left font-mono">
          <div className="text-zinc-500 font-sans text-[11px] font-bold uppercase">
            Telemetry Audit Summary
          </div>
          <div>Status: <span className="text-red-400 font-bold">locked_for_review</span></div>
          <div>Warnings Accumulated: <span className="text-amber-400">{warningCount} / {maxWarnings}</span></div>
          <div>Action: Automatic Answer Snapshot Captured</div>
        </div>

        <div className="pt-2">
          <button
            onClick={onViewResults}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-zinc-950 text-xs font-bold hover:bg-zinc-200 transition shadow-lg"
          >
            <FileText className="w-4 h-4" />
            <span>Proceed to Results & Feedback</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
