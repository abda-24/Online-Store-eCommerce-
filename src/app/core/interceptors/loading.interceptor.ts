import { HttpInterceptorFn, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner'; // Assuming you're using ngx-spinner

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const spinner = inject(NgxSpinnerService); // Inject the spinner service

  // Show the spinner
  spinner.show();

  // Handle the request and hide the spinner when done
  return next(req).pipe(
    finalize(() => {
      spinner.hide();
    })
  );
};
