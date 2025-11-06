import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextGenerationService } from '../../services/text-generation.service';

@Component({
  selector: 'app-text-generation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-generation.component.html',
  styleUrls: ['./text-generation.component.css']
})
export class TextGenerationComponent {
  private readonly svc = inject(TextGenerationService);

  protected readonly prompt = signal<string>('');
  protected readonly answer = signal<string>('');
  protected readonly loading = signal<boolean>(false);

  async onSubmit() {
    if (!this.prompt().trim()) return;
    this.loading.set(true);
    this.answer.set('');
    try {
      const res = await this.svc.generate(this.prompt()).toPromise();
      this.answer.set(res?.response ?? '');
    } finally {
      this.loading.set(false);
    }
  }
}


