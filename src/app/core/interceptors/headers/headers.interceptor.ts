import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  // if(localStorage.getItem('userToken')){
  //   req = req.clone({
  //     setHeaders:{
  //       token: localStorage.getItem('userToken')!
  //     }
  //   })
  // }
  return next(req);

   const auth = inject(AuthService);
  // const token = auth.getToken();

  // if (token) {
  //   req = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${token}`,
  //     }
  //   });
  // }
  // return next(req);
};
