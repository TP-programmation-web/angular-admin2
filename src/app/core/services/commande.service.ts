import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants';

@Injectable({ providedIn: 'root' })
export class CommandeService {
  private http = inject(HttpClient);

  // Récupérer uniquement les commandes qui n'ont pas encore de livreur
  getPendingCommandes() {
    return this.http.get<any[]>(`${API_URL}/commandes/pending`);
  }

  // Affecter un livreur à une commande
  assignLivreur(commandeId: number, livreurId: number) {
    return this.http.post(`${API_URL}/commandes/${commandeId}/assign`, { livreur_id: livreurId });
  }
}