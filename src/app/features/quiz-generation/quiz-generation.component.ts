import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizGenerationService, Quiz, QuizQuestion } from '../../services/quiz-generation.service';

@Component({
  selector: 'app-quiz-generation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-generation.component.html',
  styleUrls: ['./quiz-generation.component.css']
})
export class QuizGenerationComponent {
  private readonly svc = inject(QuizGenerationService);

  protected readonly title = signal<string>('');
  protected readonly description = signal<string>('');
  protected readonly numberOfQuestions = signal<number>(5);
  protected readonly difficulty = signal<'easy' | 'medium' | 'hard'>('medium');
  protected readonly questionType = signal<'multiple-choice' | 'true-false' | 'short-answer'>('multiple-choice');
  
  protected readonly quiz = signal<Quiz | null>(null);
  protected readonly loading = signal<boolean>(false);
  protected readonly error = signal<string>('');
  protected readonly selectedAnswers = signal<Map<number, string>>(new Map());
  protected readonly showResults = signal<boolean>(false);

  async onSubmit() {
    if (!this.title().trim()) {
      this.error.set('Please provide a title');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.quiz.set(null);
    this.selectedAnswers.set(new Map());
    this.showResults.set(false);

    try {
      const res = await this.svc.generate({
        title: this.title(),
        description: this.description(),
        numberOfQuestions: this.numberOfQuestions(),
        difficulty: this.difficulty(),
        questionType: this.questionType(),
      }).toPromise();

      if (res?.quiz) {
        this.quiz.set(res.quiz);
      }
    } catch (err: any) {
      this.error.set(err?.error?.error || 'Failed to generate quiz. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }

  selectAnswer(questionIndex: number, answer: string) {
    const answers = new Map(this.selectedAnswers());
    answers.set(questionIndex, answer);
    this.selectedAnswers.set(answers);
  }

  getSelectedAnswer(questionIndex: number): string {
    return this.selectedAnswers().get(questionIndex) || '';
  }

  submitQuiz() {
    this.showResults.set(true);
  }

  isCorrect(question: QuizQuestion, selectedAnswer: string): boolean {
    return selectedAnswer === question.correctAnswer;
  }

  getScore(): { correct: number; total: number; percentage: number } {
    const quiz = this.quiz();
    if (!quiz) return { correct: 0, total: 0, percentage: 0 };

    let correct = 0;
    const answers = this.selectedAnswers();

    quiz.questions.forEach((question, index) => {
      const selected = answers.get(index);
      if (selected && this.isCorrect(question, selected)) {
        correct++;
      }
    });

    const total = quiz.questions.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    return { correct, total, percentage };
  }

  resetQuiz() {
    this.selectedAnswers.set(new Map());
    this.showResults.set(false);
  }

  generateNewQuiz() {
    this.quiz.set(null);
    this.showResults.set(false);
    this.selectedAnswers.set(new Map());
  }
}

