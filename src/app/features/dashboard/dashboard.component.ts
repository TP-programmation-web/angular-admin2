import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importation nécessaire pour routerLink
import Chart from 'chart.js/auto';
import { WebsocketService } from '../../core/services/websocket.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // Ajout de RouterModule ici pour activer la navigation (Membre 05)
  imports: [CommonModule, RouterModule], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('myChart') private chartCanvas!: ElementRef;
  
  private ws = inject(WebsocketService);

  // Pour l'affichage conditionnel (Membre 02/05)
  userRole: string = 'admin'; 

  // Variables pour le suivi des animations (Membre 02)
  animating: { [key: string]: boolean } = {
    en_livraison: false,
    livree: false,
    echouee: false
  };

  stats = {
    enCours: 12,
    livrees: 45,
    echouees: 3,
    totalLivreurs: 8
  };

  chart: any;
  private simulationInterval: any;

  constructor() {}

  ngOnInit(): void {
    // 1. Écoute du serveur WebSocket (Membre 02)
    this.ws.listenToLivraisons((data: any) => this.traiterDonnees(data));
    
    // 2. Lancement du simulateur temps réel
    this.lancerSimulation();
  }

  ngAfterViewInit() {
    this.createChart();
  }

  /**
   * Gestionnaire de mise à jour en temps réel (Membre 02)
   */
  traiterDonnees(data: any) {
    this.animating[data.statut] = true;

    if (data.statut === 'livree') {
      this.stats.livrees++;
      this.stats.enCours = Math.max(0, this.stats.enCours - 1);
    } else if (data.statut === 'echouee') {
      this.stats.echouees++;
      this.stats.enCours = Math.max(0, this.stats.enCours - 1);
    } else if (data.statut === 'en_livraison') {
      this.stats.enCours++;
    }

    setTimeout(() => {
      this.animating[data.statut] = false;
    }, 600);

    if (this.chart) {
      this.chart.update();
    }
  }

  lancerSimulation() {
    this.simulationInterval = setInterval(() => {
      const chance = Math.random();
      let fauxEvent = { statut: '' };

      if (chance > 0.7) {
        fauxEvent.statut = 'en_livraison';
      } else if (chance > 0.4 && this.stats.enCours > 0) {
        fauxEvent.statut = 'livree';
      }

      if (fauxEvent.statut) {
        this.traiterDonnees(fauxEvent);
      }
    }, 5000);
  }

  createChart() {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [{
          label: 'Livraisons',
          data: [12, 19, 15, 25, 22, 30, 10],
          backgroundColor: '#3b82f6',
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
    }
  }
}