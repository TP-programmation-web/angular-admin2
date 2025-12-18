import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'admin', 
    component: MainLayoutComponent, 
    canActivate: [authGuard], 
    children: [
      // Routes du Membre 02 : Dashboard Logistique (Temps Réel)
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },

      // Routes du Membre 03 : Gestion des livreurs et affectations opérationnelles
      { 
        path: 'livreurs', 
        loadComponent: () => import('./features/livreurs/livreur-list/livreur-list.component').then(m => m.LivreurListComponent) 
      },
      { 
        path: 'livreurs/nouveau', 
        loadComponent: () => import('./features/livreurs/livreur-form/livreur-form.component').then(m => m.LivreurFormComponent) 
      },
      { 
        path: 'affectation', 
        loadComponent: () => import('./features/livreurs/affectation/affectation.component').then(m => m.AffectationComponent) 
      },

      // Route du Membre 04 : Suivi GPS et supervision cartographique
      {
        path: 'suivi-map',
        loadComponent: () => import('./features/suivi-livraison/map.component').then(m => m.MapComponent)
      },

      // NOUVEAU - Route du Membre 05 : Preuves de livraison et reporting
      // Permet l'affichage détaillé des livraisons et la vérification des preuves (photo/signature)
      {
        path: 'logs',
        loadComponent: () => import('./features/reporting/reporting.component').then(m => m.ReportingComponent)
      },

      // Redirection par défaut vers le dashboard
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];