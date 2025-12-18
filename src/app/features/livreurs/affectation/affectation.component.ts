import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandeService } from '../../../core/services/commande.service';
import { LivreurService } from '../../../core/services/livreur.service';
import { Livreur } from '../../../core/models/livreur.model';

@Component({
  selector: 'app-affectation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './affectation.component.html',
  styleUrl: './affectation.component.scss'
})
export class AffectationComponent implements OnInit {
  private commandeService = inject(CommandeService);
  private livreurService = inject(LivreurService);

  pendingCommandes: any[] = [];
  livreursDisponibles: Livreur[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Étape 4 : Commandes en attente
    this.commandeService.getPendingCommandes().subscribe({
      next: (data) => this.pendingCommandes = data,
      error: (err) => console.error('Erreur commandes:', err)
    });

    // Étape 7 : Filtrage des livreurs disponibles
    this.livreurService.getAll().subscribe({
      next: (data) => {
        this.livreursDisponibles = data.filter(l => l.statut === 'disponible');
      },
      error: (err) => console.error('Erreur livreurs:', err)
    });
  }

  // Étape 5 : Affectation manuelle
  validerAffectation(commandeId: number, livreurId: number): void {
    if (!livreurId) return;
    this.assign(commandeId, livreurId);
  }

  // Étape 6 : Affectation automatique simple
  autoAssign(): void {
    if (this.pendingCommandes.length === 0 || this.livreursDisponibles.length === 0) {
      alert("Aucune commande ou livreur disponible.");
      return;
    }

    const limit = Math.min(this.pendingCommandes.length, this.livreursDisponibles.length);
    
    for (let i = 0; i < limit; i++) {
      this.assign(this.pendingCommandes[i].id, this.livreursDisponibles[i].id!, i === limit - 1);
    }
  }

  private assign(commandeId: number, livreurId: number, last: boolean = true): void {
    this.commandeService.assignLivreur(commandeId, livreurId).subscribe({
      next: () => {
        if (last) {
          alert('Opération réussie !');
          this.loadData();
        }
      },
      error: (err) => console.error('Erreur affectation:', err)
    });
  }
}