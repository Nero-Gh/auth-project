import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

export const AuthGuard: CanActivateFn = (route, state) => {
  const auth = localStorage.getItem('token');
  const routes = inject(Router);
  const toast = inject(NgToastService);
  if (auth !== null) {
    return true;
  } else {
    toast.error({
      detail: 'SUCCESS',
      summary: 'Please login first',
      duration: 5000,
    });
    routes.navigate(['login']);
    return false;
  }
};
