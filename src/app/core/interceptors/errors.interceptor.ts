import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const _toast = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      console.log("Interceptors Error:", err.error.message);
      _toast.error(err.error.message, 'Error');
      return throwError(() => new Error(err.error.message));
    })
  );
};
