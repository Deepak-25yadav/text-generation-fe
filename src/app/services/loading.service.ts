import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly activeRequests = signal(0);
  readonly isLoading = signal(false);

  start() {
    this.activeRequests.set(this.activeRequests() + 1);
    this.isLoading.set(true);
  }

  stop() {
    const next = Math.max(0, this.activeRequests() - 1);
    this.activeRequests.set(next);
    if (next === 0) this.isLoading.set(false);
  }
}


