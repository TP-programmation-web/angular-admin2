export interface User {
  id: number;
  nom: string;
  email: string;
  role: 'Admin' | 'Gestionnaire' | 'Superviseur'; // Gestion des rôles demandée [cite: 17, 43]
}

export interface AuthResponse {
  token: string;
  user: User;
}