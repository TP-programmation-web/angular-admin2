import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Cette ligne est nécessaire pour que Laravel Echo trouve Pusher dans l'objet global window
(window as any).Pusher = Pusher;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  // Correction de la ligne 7 : Typage correct de la propriété
  private echo: any;

  constructor() {
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: 'VOTRE_CLE_PUSHER', // À remplacer par votre clé réelle
      cluster: 'mt1',
      forceTLS: true
    });
  }

  listenToLivraisons(callback: (data: any) => void) {
    this.echo.channel('livraisons')
      .listen('StatutChange', (e: any) => {
        callback(e);
      });
  }
}