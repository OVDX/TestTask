"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Quiz Builder
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Create, manage, and view quizzes with ease
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/create")}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Create New Quiz
            </button>
            <button
              onClick={() => router.push("/quizzes")}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition shadow-lg hover:shadow-xl border-2 border-blue-600"
            >
              View All Quizzes
            </button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="text-blue-600 text-3xl mb-2">✓</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Multiple Question Types
              </h3>
              <p className="text-gray-600 text-sm">
                True/False, Short Answer, and Multiple Choice
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="text-blue-600 text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy to Use</h3>
              <p className="text-gray-600 text-sm">
                Intuitive interface for quick quiz creation
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="text-blue-600 text-3xl mb-2">📝</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Full Management
              </h3>
              <p className="text-gray-600 text-sm">
                View, edit, and delete quizzes anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
