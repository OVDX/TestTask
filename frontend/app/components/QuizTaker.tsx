import { Question } from "@/lib/api";
import { useState } from "react";

interface QuizTakerProps {
  questions: Question[];
}

interface UserAnswers {
  [key: number]: boolean | string | string[];
}

export default function QuizTaker({ questions }: QuizTakerProps) {
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [showResults, setShowResults] = useState(false);

  const handleBooleanAnswer = (questionIndex: number, value: boolean) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: value }));
  };

  const handleInputAnswer = (questionIndex: number, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: value }));
  };

  const handleCheckboxAnswer = (
    questionIndex: number,
    option: string,
    checked: boolean
  ) => {
    setUserAnswers((prev) => {
      const currentAnswers = (prev[questionIndex] as string[]) || [];
      const newAnswers = checked
        ? [...currentAnswers, option]
        : currentAnswers.filter((a) => a !== option);
      return { ...prev, [questionIndex]: newAnswers };
    });
  };

  const checkAnswer = (questionIndex: number): boolean => {
    const question = questions[questionIndex];
    const userAnswer = userAnswers[questionIndex];

    if (question.type === "BOOLEAN") {
      return userAnswer === question.answer;
    }

    if (question.type === "INPUT") {
      return (
        (userAnswer as string)?.toLowerCase().trim() ===
        (question.answer as string).toLowerCase().trim()
      );
    }

    if (question.type === "CHECKBOX") {
      const correctAnswers = (question.answer as string[]).sort();
      const userAnswersArray = ((userAnswer as string[]) || []).sort();
      return (
        correctAnswers.length === userAnswersArray.length &&
        correctAnswers.every((val, idx) => val === userAnswersArray[idx])
      );
    }

    return false;
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((_, index) => {
      if (checkAnswer(index)) correct++;
    });
    return correct;
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  const allQuestionsAnswered = questions.every(
    (_, index) => userAnswers[index] !== undefined
  );

  return (
    <div className="space-y-6">
      {questions
        .sort((a, b) => a.order - b.order)
        .map((question, index) => {
          const isAnswered = userAnswers[index] !== undefined;
          const isCorrect = showResults && checkAnswer(index);
          const isIncorrect = showResults && isAnswered && !isCorrect;

          return (
            <div
              key={index}
              className={`bg-white rounded-lg shadow p-6 ${
                showResults
                  ? isCorrect
                    ? "border-2 border-green-500"
                    : isIncorrect
                      ? "border-2 border-red-500"
                      : "border-2 border-gray-300"
                  : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    showResults
                      ? isCorrect
                        ? "bg-green-600 text-white"
                        : isIncorrect
                          ? "bg-red-600 text-white"
                          : "bg-gray-400 text-white"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {showResults ? (
                    isCorrect ? (
                      <svg
                        className="w-5 h-5"
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
                    ) : isIncorrect ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      "?"
                    )
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {question.text}
                  </h3>

                  {/* BOOLEAN Questions */}
                  {question.type === "BOOLEAN" && (
                    <div className="space-y-3">
                      {[true, false].map((value) => {
                        const isSelected = userAnswers[index] === value;
                        const isCorrectAnswer = question.answer === value;
                        const showCorrect = showResults && isCorrectAnswer;
                        const showIncorrect =
                          showResults && isSelected && !isCorrectAnswer;

                        return (
                          <label
                            key={String(value)}
                            className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition ${
                              showResults
                                ? showCorrect
                                  ? "border-green-500 bg-green-50"
                                  : showIncorrect
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-200"
                                : isSelected
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${index}`}
                              checked={isSelected}
                              onChange={() =>
                                !showResults &&
                                handleBooleanAnswer(index, value)
                              }
                              disabled={showResults}
                              className="w-4 h-4"
                            />
                            <span
                              className={`flex-1 ${
                                showCorrect
                                  ? "font-semibold text-green-700"
                                  : showIncorrect
                                    ? "text-red-700"
                                    : isSelected
                                      ? "font-medium"
                                      : ""
                              }`}
                            >
                              {value ? "True" : "False"}
                            </span>
                            {showCorrect && (
                              <svg
                                className="w-5 h-5 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {/* INPUT Questions */}
                  {question.type === "INPUT" && (
                    <div>
                      <input
                        type="text"
                        value={(userAnswers[index] as string) || ""}
                        onChange={(e) =>
                          !showResults &&
                          handleInputAnswer(index, e.target.value)
                        }
                        disabled={showResults}
                        placeholder="Type your answer..."
                        className={`w-full px-4 py-2 border-2 rounded-lg ${
                          showResults
                            ? isCorrect
                              ? "border-green-500 bg-green-50"
                              : isAnswered
                                ? "border-red-500 bg-red-50"
                                : "border-gray-300"
                            : "border-gray-300 focus:border-blue-500 focus:outline-none"
                        }`}
                      />
                      {showResults && !isCorrect && (
                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded">
                          <p className="text-sm text-gray-600">
                            Correct answer:
                          </p>
                          <p className="font-semibold text-green-700">
                            {question.answer as string}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CHECKBOX Questions */}
                  {question.type === "CHECKBOX" && (
                    <div className="space-y-3">
                      {question.options?.map((option, oIndex) => {
                        const isSelected = (
                          (userAnswers[index] as string[]) || []
                        ).includes(option);
                        const isCorrectAnswer = (
                          question.answer as string[]
                        ).includes(option);
                        const showCorrect = showResults && isCorrectAnswer;
                        const showIncorrect =
                          showResults && isSelected && !isCorrectAnswer;

                        return (
                          <label
                            key={oIndex}
                            className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition ${
                              showResults
                                ? showCorrect
                                  ? "border-green-500 bg-green-50"
                                  : showIncorrect
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-200"
                                : isSelected
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) =>
                                !showResults &&
                                handleCheckboxAnswer(
                                  index,
                                  option,
                                  e.target.checked
                                )
                              }
                              disabled={showResults}
                              className="w-4 h-4"
                            />
                            <span
                              className={`flex-1 ${
                                showCorrect
                                  ? "font-semibold text-green-700"
                                  : showIncorrect
                                    ? "text-red-700"
                                    : isSelected
                                      ? "font-medium"
                                      : ""
                              }`}
                            >
                              {option}
                            </span>
                            {showCorrect && (
                              <svg
                                className="w-5 h-5 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

      {/* Submit/Reset Buttons */}
      <div className="flex gap-4 justify-center pt-4">
        {!showResults ? (
          <button
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
            className={`px-8 py-3 rounded-lg font-semibold text-white transition ${
              allQuestionsAnswered
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit Quiz
          </button>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <p className="text-gray-600 mb-2">Your Score</p>
              <p className="text-4xl font-bold text-blue-600">
                {calculateScore()} / {questions.length}
              </p>
              <p className="text-gray-500 mt-2">
                {Math.round((calculateScore() / questions.length) * 100)}%
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
