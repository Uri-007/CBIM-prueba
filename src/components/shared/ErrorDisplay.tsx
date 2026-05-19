interface ErrorDisplayProps {
  message?: string;
}

export function ErrorDisplay({ message = "Algo salió mal." }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
      <span className="text-5xl">⚡</span>
      <h3 className="text-xl font-semibold text-red-400">Error</h3>
      <p className="text-zinc-500 max-w-sm text-sm">{message}</p>
    </div>
  );
}
