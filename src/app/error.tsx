"use client";

import { useEffect } from "react";
import { ErrorDisplay } from "@/components/shared/ErrorDisplay";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-6">
      <ErrorDisplay message={error.message} />
      <button
        onClick={reset}
        className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-medium text-sm hover:bg-cyan-400 transition-colors"
      >
        Reintentar
      </button>
    </div>
  );
}
