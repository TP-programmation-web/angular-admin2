import { Component, OnInit } from '@angular/core'; // Corrigé ici
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {
  allLogs = [
    { id: 'ORD-102', livreur: 'Moussa Diallo', date: '2023-12-15', delai: 25, statut: 'Validé', montant: 5000, alerte: false },
    { id: 'ORD-105', livreur: 'Fatou Sow', date: '2023-12-17', delai: 18, statut: 'En attente', montant: 3500, alerte: false },
    { id: 'ORD-108', livreur: 'Moussa Diallo', date: '2025-01-01', delai: -5, statut: 'Validé', montant: 7200, alerte: false }
  ];

  filteredLogs = [...this.allLogs];
  selectedLog: any = null;
  showModal = false;

  // Filtres
  filterDateDebut = '';
  filterDateFin = '';
  selectedLivreur = 'tous';

  ngOnInit(): void {
    this.testerCoherence(); // Étape 10 du rapport
    this.appliquerFiltres(); // Étape 6 du rapport
  }

  testerCoherence(): void {
    const aujourdhui = new Date().toISOString().split('T')[0];
    this.allLogs.forEach(log => {
      if (log.date > aujourdhui || log.delai <= 0) {
        log.alerte = true;
      }
    });
  }

  appliquerFiltres(): void {
    this.filteredLogs = this.allLogs.filter(log => {
      const matchLivreur = this.selectedLivreur === 'tous' || log.livreur === this.selectedLivreur;
      const matchDateDebut = !this.filterDateDebut || log.date >= this.filterDateDebut;
      const matchDateFin = !this.filterDateFin || log.date <= this.filterDateFin;
      return matchLivreur && matchDateDebut && matchDateFin;
    });
  }

  ouvrirPreuve(log: any): void {
    this.selectedLog = log;
    this.showModal = true;
  }

  fermerModal(): void {
    this.showModal = false;
    this.selectedLog = null;
  }

  exportPDF(): void {
    const doc = new jsPDF();
    doc.text('Rapport Logistique', 14, 20);
    const rows = this.filteredLogs.map(l => [l.id, l.livreur, l.date, l.statut]);
    autoTable(doc, { head: [['ID', 'Livreur', 'Date', 'Statut']], body: rows, startY: 30 });
    doc.save('rapport.pdf');
  }

  exportExcel(): void {
    const ws = XLSX.utils.json_to_sheet(this.filteredLogs);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Logs');
    XLSX.writeFile(wb, 'rapport.xlsx');
  }
  validerLivraison(id: string) {
    const log = this.allLogs.find(l => l.id === id);
    if (log) {
      log.statut = 'Validé';
      // On relance les filtres pour mettre à jour l'affichage
      this.appliquerFiltres();
    } 
  }
}