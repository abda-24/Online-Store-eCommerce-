import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const _PLATFORM_ID = inject(PLATFORM_ID);

  // Check if the code is running in a browser environment
  if (isPlatformBrowser(_PLATFORM_ID)) {
    // Check if the user is already logged in (e.g., has a token in localStorage)
    if (localStorage.getItem('userToken') !== null) {
      // If logged in, redirect to the home page
      _Router.navigate(['/home']);
      return false; // Prevent access to the route
    }
  }

  // Allow access to the route if the user is not logged in
  return true;
};
