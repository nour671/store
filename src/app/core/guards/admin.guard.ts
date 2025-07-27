import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const token = localStorage.getItem('userToken');

    if (token && isAdmin) {
      return true;
    } else {
      router.navigate(['/home']);
      return false;
    }
  }
  return false;
};
