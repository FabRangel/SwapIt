import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonText, IonLabel, IonList, IonItem, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, ModalController } from '@ionic/angular/standalone';
import { ModalAskingComponent } from '../components/modal-asking/modal-asking.component';
import { ItemOfferComponent } from '../components/item-offer/item-offer.component';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: true,
  imports: [ItemOfferComponent, ModalAskingComponent, IonIcon, IonButton, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonItem, IonList, IonLabel, IonText, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class Tab5Page implements OnInit {
  products: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private FavoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.loadFavorites(); // Cargar los favoritos al inicializar el componente
  }

  // Cargar los favoritos desde el backend
  loadFavorites() {
    this.FavoritesService.getFavorites().subscribe(
      (response: any) => {
        this.products = response.data;
      },
      (error) => {
        console.error('Error al cargar los favoritos:', error);
      }
    );
  }


  deleteFavorite(productId: number) {
    this.FavoritesService.deleteFavorite(productId).subscribe(
      () => {
        this.products = this.products.filter(product => product.id !== productId);
      },
      (error) => {
        console.error('Error al eliminar el favorito:', error);
      }
    );
  }

  async openAskingModal(askType: 'finalizar' | 'pausar' | 'aceptar' | 'eliminar') {
    const modal = await this.modalCtrl.create({
      component: ModalAskingComponent,
      mode: 'ios',
      cssClass: 'my-modal',
      showBackdrop: false,
      componentProps: {
        askType: askType,
        title:
          askType === 'finalizar'
            ? '¿Desea finalizar este producto de sus favoritos?'
            : askType === 'pausar'
            ? '¿Desea pausar esta oferta?'
            : askType === 'aceptar'
            ? '¿Desea aceptar este intercambio?'
            : '¿Desea eliminar esta oferta?',
        subtitle:
          askType === 'finalizar'
            ? 'Esta acción es irreversible.'
            : askType === 'pausar'
            ? 'Reactiva en cualquier momento.'
            : askType === 'aceptar'
            ? 'Esta acción es irreversible.'
            : 'Esta acción es irreversible.',
      },
    });
    await modal.present();
  }

  async openOfferModal() {
    const modal = await this.modalCtrl.create({
      component: ItemOfferComponent,
      mode: 'ios',
      cssClass: 'my-modal',
      showBackdrop: false,
    });
    await modal.present();
  }
}
