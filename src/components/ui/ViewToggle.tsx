"use client";

import type { ViewMode } from "@/types";

interface ViewToggleProps {
  viewMode: ViewMode;
  onToggle: () => void;
}

export function ViewToggle({ viewMode, onToggle }: ViewToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all text-sm"
      aria-label={`Cambiar a vista ${viewMode === "grid" ? "lista" : "cuadrícula"}`}
    >
      {viewMode === "grid" ? (
        <>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 5h2v2H3zm4 0h14v2H7zm-4 6h2v2H3zm4 0h14v2H7zm-4 6h2v2H3zm4 0h14v2H7z" />
          </svg>
          <span className="hidden sm:inline">Lista</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z" />
          </svg>
          <span className="hidden sm:inline">Grid</span>
        </>
      )}
    </button>
  );
}
