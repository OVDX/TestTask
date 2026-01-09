"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { quizApi, Quiz } from "@/lib/api";
import Layout from "@/app/components/Layout";
import QuestionDisplay from "@/app/components/QuestionDisplay";

export default function QuizDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    try {
      setLoading(true);
      const data = await quizApi.getQuizById(params.id as string);
      setQuiz(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load quiz");
    } finally {
      setLoading(false);
    }
  };

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
            <p className="text-gray-600">
              {quiz.questions.length}{" "}
              {quiz.questions.length === 1 ? "question" : "questions"}
            </p>
          </div>

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
        </div>
      </div>
    </Layout>
  );
}
