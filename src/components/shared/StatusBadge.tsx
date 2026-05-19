import { getStatusColor } from "@/utils";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const color = getStatusColor(status);
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium">
      <span
        className="inline-block w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span style={{ color }}>{status}</span>
    </span>
  );
}
