"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { quizApi, QuizListItem } from "@/lib/api";
import Layout from "@/app/components/Layout";
import QuizCard from "@/app/components/QuizCard";

export default function QuizzesPage() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const data = await quizApi.getAllQuizzes();
      setQuizzes(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this quiz?")) return;

    try {
      setDeletingId(id);
      await quizApi.deleteQuiz(id);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete quiz");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-600 text-xl">Loading quizzes...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">All Quizzes</h1>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {quizzes.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-500 text-lg mb-4">No quizzes yet</p>
              <button
                onClick={() => router.push("/create")}
                className="text-blue-600 hover:text-blue-800"
              >
                Create your first quiz
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {quizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onClick={() => router.push(`/quizzes/${quiz.id}`)}
                  onDelete={(e) => handleDelete(quiz.id, e)}
                  isDeleting={deletingId === quiz.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
