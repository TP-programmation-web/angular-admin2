import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.spec';

@Component({
  selector: 'app-livraison-list',
  standalone: true, // <--- C'est ça la version moderne
  imports: [CommonModule], // <--- On importe les outils de base ici
  templateUrl: './livraison-list.component.html'
})
export class LivraisonListComponent implements OnInit {

  livraisons: any[] = [];
  chargement: boolean = true;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.chargerDonnees();
  }

  chargerDonnees() {
    this.api.getLivraisons().subscribe({
      next: (data: any) => {
        console.log('Données :', data);
        this.livraisons = data;
        this.chargement = false;
      },
      error: (err) => {
        console.error('Erreur :', err);
        this.chargement = false;
      }
    });
  }
}
