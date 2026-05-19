"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const navigate = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    )
      pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <button
        disabled={currentPage === 1}
        onClick={() => navigate(currentPage - 1)}
        className="px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-white/10 disabled:border-transparent"
      >
        Atras
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-zinc-600">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => navigate(p)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition-all border ${
              p === currentPage
                ? "bg-cyan-500 text-black border-cyan-500 shadow-lg shadow-cyan-500/30"
                : "text-zinc-400 hover:text-white hover:bg-white/5 border-white/10"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => navigate(currentPage + 1)}
        className="px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-white/10 disabled:border-transparent"
      >
        Sigueinte
      </button>
    </div>
  );
}
