interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: string;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon = "📝",
}: EmptyStateProps) {
  return (
    <div className="bg-white rounded-lg shadow p-12 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <p className="text-gray-500 text-lg mb-2">{title}</p>
      {description && (
        <p className="text-gray-400 text-sm mb-4">{description}</p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="text-blue-600 hover:text-blue-800 font-medium transition"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
