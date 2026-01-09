"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { quizApi, Quiz } from "@/lib/api";
import Layout from "@/app/components/Layout";
import QuestionDisplay from "@/app/components/QuestionDisplay";
import QuizTaker from "@/app/components/QuizTaker";

export default function QuizDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<"answers" | "take">("take");

  const loadQuiz = useCallback(async () => {
    try {
      setLoading(true);
      const data = await quizApi.getQuizById(params.id as string);
      setQuiz(data);
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const axiosErr = err as {
          response?: { data?: { message?: string } };
        };
        setError(axiosErr.response?.data?.message || "Failed to load quiz");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load quiz");
      }
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    loadQuiz();
  }, [loadQuiz]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-600 text-xl">Loading quiz...</div>
        </div>
      </Layout>
    );
  }

  if (error || !quiz) {
    return (
      <Layout>
        <div className="py-8 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error || "Quiz not found"}
            </div>
            <button
              onClick={() => router.push("/quizzes")}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back to quizzes
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => router.push("/quizzes")}
            className="text-blue-600 hover:text-blue-800 mb-6 flex items-center gap-2"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to quizzes
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {quiz.title}
            </h1>
            <p className="text-gray-600 mb-4">
              {quiz.questions.length}{" "}
              {quiz.questions.length === 1 ? "question" : "questions"}
            </p>

            {/* Mode Toggle */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setViewMode("take")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  viewMode === "take"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Take Quiz
              </button>
              <button
                onClick={() => setViewMode("answers")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  viewMode === "answers"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                View Answers
              </button>
            </div>
          </div>

          {viewMode === "take" ? (
            <QuizTaker questions={quiz.questions} />
          ) : (
            <div className="space-y-6">
              {quiz.questions
                .sort((a, b) => a.order - b.order)
                .map((question, index) => (
                  <QuestionDisplay
                    key={index}
                    question={question}
                    index={index}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
