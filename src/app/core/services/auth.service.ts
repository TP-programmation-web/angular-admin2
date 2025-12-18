import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  // Ajoute cette méthode pour que le Guard soit content
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  login() {
    localStorage.setItem('token', 'fake-jwt-token');
    this.router.navigate(['/admin/livreurs']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}