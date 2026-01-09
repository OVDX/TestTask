"use client";
import { Question } from "@/lib/api";

interface QuestionFormProps {
  question: Question;
  index: number;
  totalQuestions: number;
  onUpdate: <K extends keyof Question>(field: K, value: Question[K]) => void;
  onRemove: () => void;
  onAddOption: () => void;
  onUpdateOption: (optionIndex: number, value: string) => void;
  onRemoveOption: (optionIndex: number) => void;
  onToggleCheckboxAnswer: (option: string) => void;
}

export default function QuestionForm({
  question,
  index,
  totalQuestions,
  onUpdate,
  onRemove,
  onAddOption,
  onUpdateOption,
  onRemoveOption,
  onToggleCheckboxAnswer,
}: QuestionFormProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Question {index + 1}
        </h3>
        {totalQuestions > 1 && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-600 hover:text-red-800 transition"
          >
            ✕ Remove
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question Type
          </label>
          <select
            value={question.type}
            onChange={(e) =>
              onUpdate("type", e.target.value as Question["type"])
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="BOOLEAN">True/False</option>
            <option value="INPUT">Short Answer</option>
            <option value="CHECKBOX">Multiple Choice</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question Text
          </label>
          <input
            type="text"
            value={question.text}
            onChange={(e) => onUpdate("text", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your question"
          />
        </div>

        {question.type === "BOOLEAN" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correct Answer
            </label>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={question.answer === true}
                  onChange={() => onUpdate("answer", true)}
                  className="mr-2"
                />
                True
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={question.answer === false}
                  onChange={() => onUpdate("answer", false)}
                  className="mr-2"
                />
                False
              </label>
            </div>
          </div>
        )}

        {question.type === "INPUT" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correct Answer
            </label>
            <input
              type="text"
              value={question.answer as string}
              onChange={(e) => onUpdate("answer", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter correct answer"
            />
          </div>
        )}

        {question.type === "CHECKBOX" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Options
            </label>
            <div className="space-y-2">
              {question.options?.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={(question.answer as string[]).includes(option)}
                    onChange={() => onToggleCheckboxAnswer(option)}
                    className="flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => onUpdateOption(oIndex, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Option ${oIndex + 1}`}
                  />
                  {question.options!.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onRemoveOption(oIndex)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={onAddOption}
                className="text-blue-600 hover:text-blue-800 text-sm transition"
              >
                + Add Option
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Check the boxes for correct answers
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
