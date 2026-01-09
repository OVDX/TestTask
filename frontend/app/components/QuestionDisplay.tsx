import { Question } from "@/lib/api";

interface QuestionDisplayProps {
  question: Question;
  index: number;
}

export default function QuestionDisplay({
  question,
  index,
}: QuestionDisplayProps) {
  const getQuestionTypeLabel = (type: Question["type"]) => {
    switch (type) {
      case "BOOLEAN":
        return "True/False";
      case "INPUT":
        return "Short Answer";
      case "CHECKBOX":
        return "Multiple Choice";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
          {index + 1}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {question.text}
          </h3>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Type:{" "}
              <span className="text-blue-600">
                {getQuestionTypeLabel(question.type)}
              </span>
            </p>

            {question.type === "BOOLEAN" && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      question.answer === true
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300"
                    }`}
                  />
                  <span
                    className={
                      question.answer === true
                        ? "font-semibold text-green-700"
                        : "text-gray-600"
                    }
                  >
                    True
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      question.answer === false
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300"
                    }`}
                  />
                  <span
                    className={
                      question.answer === false
                        ? "font-semibold text-green-700"
                        : "text-gray-600"
                    }
                  >
                    False
                  </span>
                </div>
              </div>
            )}

            {question.type === "INPUT" && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Expected answer:</p>
                <div className="bg-white border border-gray-300 rounded px-3 py-2 text-gray-900">
                  {question.answer as string}
                </div>
              </div>
            )}

            {question.type === "CHECKBOX" && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-2">Options:</p>
                {question.options?.map((option, oIndex) => {
                  const isCorrect = (question.answer as string[]).includes(
                    option
                  );
                  return (
                    <div key={oIndex} className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          isCorrect
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300"
                        }`}
                      >
                        {isCorrect && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={
                          isCorrect
                            ? "font-semibold text-green-700"
                            : "text-gray-600"
                        }
                      >
                        {option}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
