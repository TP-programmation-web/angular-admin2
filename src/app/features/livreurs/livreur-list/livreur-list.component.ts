import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LivreurService } from '../../../core/services/livreur.service';
import { Livreur } from '../../../core/models/livreur.model';

@Component({
  selector: 'app-livreur-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './livreur-list.component.html',
  styleUrl: './livreur-list.component.scss' // Assurez-vous que le fichier existe ou changez en .css
})
export class LivreurListComponent implements OnInit {
  // Injection des services
  private livreurService = inject(LivreurService);
  
  // Liste des livreurs à afficher
  livreurs: Livreur[] = [];

  ngOnInit(): void {
    this.refreshList();
  }

  /**
   * Récupère la liste actualisée des livreurs depuis le service
   */
  refreshList(): void {
    this.livreurService.getAll().subscribe({
      next: (data) => {
        this.livreurs = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des livreurs', err);
        // Message d'aide en cas d'erreur API
        console.info('Note: Vérifiez que votre backend Laravel est lancé et que le CORS est configuré.');
      }
    });
  }

  /**
   * Gère la suppression d'un livreur
   * @param id L'identifiant unique du livreur
   */
  supprimerLivreur(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livreur ?')) {
      this.livreurService.delete(id).subscribe({
        next: () => {
          // Mise à jour locale de la liste pour un affichage instantané
          this.livreurs = this.livreurs.filter(livreur => livreur.id !== id);
          alert('Livreur supprimé avec succès.');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
          // Simulation visuelle si le backend est hors ligne (optionnel pour le test)
          this.livreurs = this.livreurs.filter(l => l.id !== id);
          alert('Note : Suppression effectuée localement (Erreur de connexion API).');
        }
      });
    }
  }
}