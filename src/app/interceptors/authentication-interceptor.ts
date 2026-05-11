import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = environment.apiKey;

  const clonedReq = req.clone({
    setHeaders: {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json',
    },
  });

  return next(clonedReq);
};
