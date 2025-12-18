export interface Livreur {
  id?: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  statut: 'disponible' | 'en_livraison' | 'inactif';
  vehicule?: string;
}