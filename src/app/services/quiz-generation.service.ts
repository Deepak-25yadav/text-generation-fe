import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  questionType: 'multiple-choice' | 'true-false' | 'short-answer';
  timeLimit?: number;
  mediaUrl?: string;
  hints: string[];
  isActive: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  totalPoints: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface GenerateQuizRequest {
  title: string;
  description?: string;
  numberOfQuestions?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  questionType?: 'multiple-choice' | 'true-false' | 'short-answer';
}

export interface GenerateQuizResponse {
  success: boolean;
  quiz: Quiz;
  metadata?: {
    model: string;
    tokens?: number;
  };
}

@Injectable({ providedIn: 'root' })
export class QuizGenerationService {
  private readonly api = inject(ApiService);

  generate(request: GenerateQuizRequest) {
    return this.api.post<GenerateQuizResponse>('/quiz/generate', request);
  }

  getQuiz(id: string) {
    return this.api.get<{ success: boolean; quiz: Quiz }>(`/quiz/${id}`);
  }

  getAllQuizzes() {
    return this.api.get<{ success: boolean; quizzes: Quiz[] }>('/quiz');
  }
}

