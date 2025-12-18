import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LivreurService } from '../../../core/services/livreur.service';

@Component({
  selector: 'app-livreur-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './livreur-form.component.html',
  styleUrls: ['./livreur-form.component.scss'] // Assurez-vous que le fichier existe
})
export class LivreurFormComponent {
  private fb = inject(FormBuilder);
  private livreurService = inject(LivreurService);
  private router = inject(Router);

  // Initialisation du formulaire réactif avec validations
  livreurForm: FormGroup = this.fb.group({
    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', [Validators.required]],
    vehicule: ['Moto', [Validators.required]],
    statut: ['disponible'] // Valeur par défaut en minuscules pour correspondre au modèle
  });

  onSubmit() {
    if (this.livreurForm.valid) {
      console.log('Données envoyées :', this.livreurForm.value);
      this.livreurService.create(this.livreurForm.value).subscribe({
        next: () => {
          alert('Livreur créé avec succès !');
          this.router.navigate(['/admin/livreurs']);
        },
        error: (err) => {
          console.error('Erreur lors de la création', err);
          alert('Erreur lors de la création. Vérifiez la console.');
        }
      });
    } else {
      alert('Veuillez remplir correctement tous les champs obligatoires.');
    }
  }
}