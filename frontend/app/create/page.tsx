"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { quizApi, Question } from "@/lib/api";
import Layout from "@/app/components/Layout";
import QuestionForm from "@/app/components/QuestionForm";

export default function CreateQuizPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { type: "BOOLEAN", text: "", answer: true, order: 1 },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const addQuestion = () => {
    const newQuestion: Question = {
      type: "BOOLEAN",
      text: "",
      answer: true,
      order: questions.length + 1,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length === 1) return;
    const updated = questions.filter((_, i) => i !== index);
    updated.forEach((q, i) => (q.order = i + 1));
    setQuestions(updated);
  };

  const updateQuestion = <K extends keyof Question>(
    index: number,
    field: K,
    value: Question[K]
  ) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };

    if (field === "type") {
      if (value === "BOOLEAN") {
        updated[index].answer = true;
        delete updated[index].options;
      } else if (value === "INPUT") {
        updated[index].answer = "";
        delete updated[index].options;
      } else if (value === "CHECKBOX") {
        updated[index].answer = [];
        updated[index].options = [""];
      }
    }

    setQuestions(updated);
  };

  const addOption = (questionIndex: number) => {
    const updated = [...questions];
    updated[questionIndex].options = [
      ...(updated[questionIndex].options || []),
      "",
    ];
    setQuestions(updated);
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updated = [...questions];
    if (updated[questionIndex].options) {
      updated[questionIndex].options![optionIndex] = value;
    }
    setQuestions(updated);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const updated = [...questions];
    if (updated[questionIndex].options) {
      updated[questionIndex].options = updated[questionIndex].options!.filter(
        (_, i) => i !== optionIndex
      );
    }
    setQuestions(updated);
  };

  const toggleCheckboxAnswer = (questionIndex: number, option: string) => {
    const updated = [...questions];
    const currentAnswers = updated[questionIndex].answer as string[];
    if (currentAnswers.includes(option)) {
      updated[questionIndex].answer = currentAnswers.filter(
        (a) => a !== option
      );
    } else {
      updated[questionIndex].answer = [...currentAnswers, option];
    }
    setQuestions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Quiz title is required");
      return;
    }

    if (questions.some((q) => !q.text.trim())) {
      setError("All questions must have text");
      return;
    }

    if (
      questions.some(
        (q) => q.type === "CHECKBOX" && (!q.options || q.options.length === 0)
      )
    ) {
      setError("Checkbox questions must have at least one option");
      return;
    }

    setIsSubmitting(true);
    try {
      await quizApi.createQuiz({ title, questions });
      router.push("/quizzes");
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const axiosErr = err as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };

        setError(axiosErr.response?.data?.message || "Failed to create quiz");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create quiz");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Create New Quiz
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quiz Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter quiz title"
              />
            </div>

            <div className="space-y-4">
              {questions.map((question, qIndex) => (
                <QuestionForm
                  key={qIndex}
                  question={question}
                  index={qIndex}
                  totalQuestions={questions.length}
                  onUpdate={(field, value) =>
                    updateQuestion(qIndex, field, value)
                  }
                  onRemove={() => removeQuestion(qIndex)}
                  onAddOption={() => addOption(qIndex)}
                  onUpdateOption={(oIndex, value) =>
                    updateOption(qIndex, oIndex, value)
                  }
                  onRemoveOption={(oIndex) => removeOption(qIndex, oIndex)}
                  onToggleCheckboxAnswer={(option) =>
                    toggleCheckboxAnswer(qIndex, option)
                  }
                />
              ))}
            </div>

            <button
              type="button"
              onClick={addQuestion}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition"
            >
              + Add Question
            </button>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
              >
                {isSubmitting ? "Creating..." : "Create Quiz"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/quizzes")}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
