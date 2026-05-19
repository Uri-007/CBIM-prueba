"use client";

import { useState, useEffect } from "react";
import type { ViewMode } from "@/types";

export function useViewMode() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  useEffect(() => {
    const stored = localStorage.getItem("viewMode") as ViewMode | null;
    if (stored === "grid" || stored === "list") {
      setViewMode(stored);
    }
  }, []);

  const toggle = () => {
    setViewMode((prev) => {
      const next = prev === "grid" ? "list" : "grid";
      localStorage.setItem("viewMode", next);
      return next;
    });
  };

  return { viewMode, toggle };
}
