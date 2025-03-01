import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  //! logic => request  seatHeaders
  if(localStorage.getItem('userToken')!== null)
  {
      req = req.clone({
    setHeaders:{token:localStorage.getItem('userToken') !}
  })
  }
  return next(req);
};
