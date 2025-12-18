import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Indispensable pour le [(ngModel)] des filtres
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  private map!: L.Map;
  private markers: { [key: number]: L.Marker } = {};
  private paths: { [key: number]: L.Polyline } = {}; // Pour tracer les tournées
  private simulationInterval: any;

  // Données de suivi (Accessibles par les filtres et la simulation)
  filterStatut: string = 'tous';
  livreurs = [
    { id: 1, nom: "Moussa Diallo", lat: 5.3484, lng: -4.0305, statut: 'en_livraison', visible: true },
    { id: 2, nom: "Fatou Sow", lat: 5.3600, lng: -4.0080, statut: 'disponible', visible: true },
    { id: 3, nom: "Koffi Kouamé", lat: 5.3310, lng: -4.0200, statut: 'en_livraison', visible: true }
  ];

  constructor() {
    // Correctif indispensable pour les icônes Leaflet dans Angular
    const iconDefault = L.icon({
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
    this.lancerSuiviTempsReel();
  }

  private initMap(): void {
    this.map = L.map('map').setView([5.3484, -4.0305], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Ajuste la taille si le composant est chargé dans un layout complexe
    setTimeout(() => this.map.invalidateSize(), 200);
  }

  /**
   * Simule la réception de données GPS (WebSocket) et trace les parcours
   */
  private lancerSuiviTempsReel(): void {
    // Création initiale
    this.livreurs.forEach(l => this.updateMarkerAndPath(l));

    // Simulation du mouvement toutes les 3 secondes
    this.simulationInterval = setInterval(() => {
      this.livreurs.forEach(l => {
        if (l.statut === 'en_livraison') {
          // Simulation d'un déplacement léger
          l.lat += (Math.random() - 0.5) * 0.0015;
          l.lng += (Math.random() - 0.5) * 0.0015;
          this.updateMarkerAndPath(l);
        }
      });
    }, 3000);
  }

  /**
   * Met à jour la position du marqueur et dessine la ligne de trajet (tournée)
   */
  private updateMarkerAndPath(l: any): void {
    if (!l.visible) return;

    const pos: L.LatLngExpression = [l.lat, l.lng];

    // 1. GESTION DU MARQUEUR
    if (this.markers[l.id]) {
      this.markers[l.id].setLatLng(pos);
    } else {
      this.markers[l.id] = L.marker(pos).addTo(this.map).bindPopup(`
        <div class="text-center p-1">
          <b class="text-blue-700">${l.nom}</b><br>
          <span class="text-[10px] font-bold uppercase ${l.statut === 'en_livraison' ? 'text-orange-500' : 'text-emerald-500'}">
            ● ${l.statut.replace('_', ' ')}
          </span>
        </div>
      `);
    }

    // 2. GESTION DE L'ITINÉRAIRE (La traînée derrière le livreur)
    if (this.paths[l.id]) {
      this.paths[l.id].addLatLng(pos);
    } else {
      this.paths[l.id] = L.polyline([pos], {
        color: l.id % 2 === 0 ? '#10b981' : '#3b82f6', // Alternance de couleurs
        weight: 3,
        opacity: 0.6,
        dashArray: '5, 10' // Ligne en pointillés pour un look "tournée"
      }).addTo(this.map);
    }
  }

  /**
   * Logique de filtrage par statut
   */
  appliquerFiltre() {
    this.livreurs.forEach(l => {
      const matchStatut = this.filterStatut === 'tous' || l.statut === this.filterStatut;
      l.visible = matchStatut;
      
      // Si on cache un livreur, on retire ses couches de la carte
      if (!l.visible) {
        if (this.markers[l.id]) this.map.removeLayer(this.markers[l.id]);
        if (this.paths[l.id]) this.map.removeLayer(this.paths[l.id]);
        delete this.markers[l.id];
        delete this.paths[l.id];
      } else {
        // Si on le réaffiche, on force une mise à jour immédiate
        this.updateMarkerAndPath(l);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.simulationInterval) clearInterval(this.simulationInterval);
  }
}