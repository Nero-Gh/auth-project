import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authLoginGuard: CanActivateFn = (route, state) => {
  const auth = localStorage.getItem('token');
  const routes = inject(Router);

  if (!auth) {
    return true;
  } else {
    routes.navigate(['dashboard']);
    return false;
  }
  return true;
};
