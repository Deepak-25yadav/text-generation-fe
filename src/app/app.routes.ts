import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'text' },
  {
    path: 'text',
    loadComponent: () =>
      import('./features/text-generation/text-generation.component')
        .then(m => m.TextGenerationComponent)
  },
  {
    path: 'image',
    loadComponent: () =>
      import('./features/image-generation/image-generation.component')
        .then(m => m.ImageGenerationComponent)
  },
  {
    path: 'quiz',
    loadComponent: () =>
      import('./features/quiz-generation/quiz-generation.component')
        .then(m => m.QuizGenerationComponent)
  },
  { path: '**', redirectTo: 'text' }
];
