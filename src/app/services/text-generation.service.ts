import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface GenerateResponse {
  success: boolean;
  prompt: string;
  response: string;
}

@Injectable({ providedIn: 'root' })
export class TextGenerationService {
  private readonly api = inject(ApiService);

  generate(prompt: string) {
    return this.api.post<GenerateResponse>('/generate', { prompt });
  }
}


