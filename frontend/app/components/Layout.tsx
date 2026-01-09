"use client";

import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => router.push("/")}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
            >
              Quiz Builder
            </button>
            <nav className="flex gap-4">
              <button
                onClick={() => router.push("/quizzes")}
                className={`px-4 py-2 rounded-lg transition ${
                  pathname?.startsWith("/quizzes")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                All Quizzes
              </button>
              <button
                onClick={() => router.push("/create")}
                className={`px-4 py-2 rounded-lg transition ${
                  pathname === "/create"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Create Quiz
              </button>
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
