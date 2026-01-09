import { QuizListItem } from "@/lib/api";

interface QuizCardProps {
  quiz: QuizListItem;
  onDelete: (e: React.MouseEvent) => void;
  onClick: () => void;
  isDeleting: boolean;
}

export default function QuizCard({
  quiz,
  onDelete,
  onClick,
  isDeleting,
}: QuizCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer p-6 relative group"
    >
      <button
        onClick={onDelete}
        disabled={isDeleting}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition"
        title="Delete quiz"
      >
        {isDeleting ? (
          <span className="text-sm">Deleting...</span>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        )}
      </button>

      <h2 className="text-xl font-semibold text-gray-900 mb-2 pr-8">
        {quiz.title}
      </h2>
      <p className="text-gray-600 text-sm">
        {quiz.questionCount}{" "}
        {quiz.questionCount === 1 ? "question" : "questions"}
      </p>
    </div>
  );
}
