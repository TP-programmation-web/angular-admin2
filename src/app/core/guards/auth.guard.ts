import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Vérification simple : si le token existe, on passe [cite: 47]
  if (authService.getToken()) {
    return true;
  }

  // Sinon, redirection vers la page de login [cite: 48]
  router.navigate(['/login']);
  return false;
};