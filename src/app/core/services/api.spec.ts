import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // URL de base de l'API Laravel
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Requête GET
   * @param endpoint - Chemin de l'endpoint (ex: '/deliverers')
   * @returns Observable avec les données typées
   */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${endpoint}`);
  }

  /**
   * Requête POST
   * @param endpoint - Chemin de l'endpoint
   * @param data - Données à envoyer
   * @returns Observable avec la réponse typée
   */
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, data);
  }

  /**
   * Requête PUT
   * @param endpoint - Chemin de l'endpoint
   * @param data - Données à envoyer
   * @returns Observable avec la réponse typée
   */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, data);
  }

  /**
   * Requête DELETE
   * @param endpoint - Chemin de l'endpoint
   * @returns Observable avec la réponse typée
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`);
  }

  getLivraison() {
    return this.http.get(`${this.apiUrl}/livraisons`);
  }
}