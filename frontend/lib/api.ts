import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Question {
  type: "BOOLEAN" | "INPUT" | "CHECKBOX";
  text: string;
  options?: string[];
  answer: boolean | string | string[];
  order: number;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  createdAt?: string;
}

export interface QuizListItem {
  id: string;
  title: string;
  questionCount: number;
}

export const quizApi = {
  createQuiz: async (data: { title: string; questions: Question[] }) => {
    const response = await api.post<Quiz>("/quizzes", data);
    return response.data;
  },

  getAllQuizzes: async () => {
    const response = await api.get<QuizListItem[]>("/quizzes");
    return response.data;
  },

  getQuizById: async (id: string) => {
    const response = await api.get<Quiz>(`/quizzes/${id}`);
    return response.data;
  },

  deleteQuiz: async (id: string) => {
    await api.delete(`/quizzes/${id}`);
  },
};

export default api;
