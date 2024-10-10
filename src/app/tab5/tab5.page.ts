import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonText, IonLabel, IonList, IonItem, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, ModalController } from '@ionic/angular/standalone';
import { ModalAskingComponent } from '../components/modal-asking/modal-asking.component';
import { ItemOfferComponent } from '../components/item-offer/item-offer.component';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: true,
  imports: [ItemOfferComponent,ModalAskingComponent,IonIcon, IonButton, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonItem, IonList, IonLabel, IonText, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class Tab5Page implements OnInit {
  products = [
    {
      id: 1,
      name: 'Producto 1',
      quality: 'Nuevo',
    },
    {
      id: 2,
      name: 'Producto 2',
      quality: 'Seminuevo',
    },
    {
      id: 3,
      name: 'Producto 3',
      quality: 'Nuevo',
    },
    {
      id: 4,
      name: 'Producto 4',
      quality: 'Nuevo',
    },
    {
      id: 5,
      name: 'Producto 5',
      quality: 'Seminuevo',
    },
    {
      id: 6,
      name: 'Producto 6',
      quality: 'Nuevo',
    },
  ];
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openAskingModal(askType: 'finalizar'| 'pausar' | 'aceptar' | 'eliminar') {
    const modal = await this.modalCtrl.create({
      component: ModalAskingComponent, 
      mode: 'ios',
      cssClass: 'my-modal',
      showBackdrop: false,
      componentProps: {
        askType: askType,
        title: askType === 'finalizar' ? '¿Realmente desea finalizar este producto de sus favoritos?' : askType === 'pausar' ? '¿Realmente desea pausar esta oferta?': askType === 'aceptar' ? '¿Realmente desea aceptar este intercambio?': '¿Realmente desea eliminar esta oferta?',
        subtitle: askType === 'finalizar' ? 'Esta acción es irreversible.' :  askType === 'pausar' ? 'Reactiva en cualquier momento.' : askType === 'aceptar' ? 'Esta acción es irreversible.': 'Esta acción es irreversible.'
      }
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
