import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from 'src/service/auth.service';

/**
 * Guard de ruta para proteger las vistas administrativas de CutsFrame.
 * Solo permite el acceso a usuarios con rol 'admin'.
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.isLoggedIn() ? authService['currentUserSubject'].value : null;

  if (user && user.role === 'admin') {
    return true;
  }

  window.alert('Acceso restringido solo para administradores');
  return router.createUrlTree(['/']);
};