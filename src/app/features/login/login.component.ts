import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Indispensable pour ngModel
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    // Simulation simple : admin@test.com / admin123
    if (this.credentials.email === 'admin@test.com' && this.credentials.password === 'admin123') {
      this.errorMessage = '';
      this.authService.login();
    } else {
      this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
    }
  }
}