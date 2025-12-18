import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Livreur } from '../models/livreur.model';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class LivreurService {
  private http = inject(HttpClient);
  private readonly endpoint = `${API_URL}/livreurs`;

  // Données de secours si l'API ne répond pas
  private mockLivreurs: Livreur[] = [
    { id: 1, nom: 'Diallo', prenom: 'Moussa', email: 'moussa@test.com', telephone: '0660808081', statut: 'disponible' },
    { id: 2, nom: 'Sow', prenom: 'Fatou', email: 'fatou@test.com', telephone: '0660808082', statut: 'en_livraison' }
  ];
  getAll(): Observable<Livreur[]> {
    return this.http.get<Livreur[]>(this.endpoint).pipe(
      catchError(() => {
        console.warn("API non détectée, chargement des données de test.");
        return of(this.mockLivreurs);
      })
    );
  }

  create(livreur: Livreur): Observable<Livreur> {
    return this.http.post<Livreur>(this.endpoint, livreur);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}