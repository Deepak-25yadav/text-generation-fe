import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageGenerationService } from '../../services/image-generation.service';

@Component({
  selector: 'app-image-generation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-generation.component.html',
  styleUrls: ['./image-generation.component.css']
})
export class ImageGenerationComponent {
  private readonly svc = inject(ImageGenerationService);

  protected readonly prompt = signal<string>('');
  protected readonly size = signal<'1024x1024' | '1792x1024' | '1024x1792'>('1024x1024');
  protected readonly quality = signal<'standard' | 'hd'>('standard');
  protected readonly imageUrl = signal<string>(''); // S3 URL
  protected readonly loading = signal<boolean>(false);
  protected readonly error = signal<string>('');

  async onSubmit() {
    if (!this.prompt().trim()) return;
    
    this.loading.set(true);
    this.error.set('');
    this.imageUrl.set('');
    
    try {
      const res = await this.svc.generate({
        prompt: this.prompt(),
        size: this.size(),
        quality: this.quality(),
      }).toPromise();
      
      console.log("res from component😍😍", res);
      console.log("res.imageUrl from component😍😍", res?.imageUrl);
      if (res?.imageUrl) {
        this.imageUrl.set(res.imageUrl); // Set S3 URL directly
      }
    } catch (err: any) {
      this.error.set(err?.error?.error || 'Failed to generate image. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }

  downloadImage() {
    const imageUrl = this.imageUrl();
    if (!imageUrl) return;

    // Download from S3 URL
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `generated-image-${Date.now()}.png`;
    link.target = '_blank';
    link.click();
  }
}

