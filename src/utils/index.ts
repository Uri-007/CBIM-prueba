import { STATUS_COLORS } from "@/constants";

export function getStatusColor(status: string): string {
  return STATUS_COLORS[status] ?? STATUS_COLORS["unknown"] ?? "#a1a1aa";
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function buildSearchParams(
  params: Record<string, string | undefined>
): string {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) sp.set(key, value);
  }
  return sp.toString() ? `?${sp.toString()}` : "";
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
