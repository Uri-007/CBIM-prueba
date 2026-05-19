interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, icon = "🛸" }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <span className="text-6xl opacity-40">{icon}</span>
      <h3 className="text-xl font-semibold text-zinc-300">{title}</h3>
      {description && (
        <p className="text-zinc-500 max-w-sm text-sm">{description}</p>
      )}
    </div>
  );
}
