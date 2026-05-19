"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Initialize from URL only once on mount
  const [value, setValue] = useState(searchParams.get("name") ?? "");
  const debounced = useDebounce(value, 400);

  // Track if this is the first render to avoid pushing on mount
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Build params from current URL but only update name/page
    const params = new URLSearchParams(searchParams.toString());
    if (debounced) {
      params.set("name", debounced);
      params.delete("page");
    } else {
      params.delete("name");
      params.delete("page");
    }

    const newSearch = params.toString();
    const currentSearch = searchParams.toString();

    // Only push if something actually changed to avoid loop
    if (newSearch !== currentSearch) {
      router.push(`${pathname}?${newSearch}`, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 text-zinc-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar personaje..."
        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500/50 transition-all"
      />
      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute inset-y-0 right-4 flex items-center text-zinc-500 hover:text-white transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
