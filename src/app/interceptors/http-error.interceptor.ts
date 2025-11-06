import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoadingService);
  loader.start();

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Basic centralized error handling; extend as needed
      console.error('HTTP error:', error);
      return throwError(() => error);
    }),
    finalize(() => loader.stop())
  );
};


