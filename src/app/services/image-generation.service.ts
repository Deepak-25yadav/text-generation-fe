import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface GenerateImageResponse {
  success: boolean;
  prompt: string;
  revisedPrompt?: string;
  imageUrl: string; // S3 URL (permanent)
  model: string;
  size: string;
  quality: string;
}

export interface GenerateImageRequest {
  prompt: string;
  size?: '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
}

@Injectable({ providedIn: 'root' })
export class ImageGenerationService {
  private readonly api = inject(ApiService);

  generate(request: GenerateImageRequest) {
    return this.api.post<GenerateImageResponse>('/image/generate', request);
  }
}

