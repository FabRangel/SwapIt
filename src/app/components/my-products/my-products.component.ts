import { Component, OnInit } from '@angular/core';
import { IonModal, IonIcon, IonButton, IonButtons, IonRow, IonCol, IonAvatar, IonText, IonGrid, IonToolbar, IonChip, IonLabel, IonTextarea, IonItem, IonList, ModalController, IonItemOptions, IonItemOption, IonListHeader, IonItemSliding } from "@ionic/angular/standalone";
import { ModalAskingComponent } from '../modal-asking/modal-asking.component';
import { ExchangeOptionsComponent } from '../exchange-options/exchange-options.component';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss'],
  standalone: true,
  imports: [IonItemSliding, IonListHeader, IonItemOption, IonItemOptions, ExchangeOptionsComponent,ModalAskingComponent,IonList, IonItem, IonTextarea, IonLabel, IonChip, IonToolbar, IonGrid, IonText, IonAvatar, IonCol, IonRow, IonButtons, IonButton, IonIcon, IonModal, ],
})
export class MyProductsComponent  implements OnInit {
  offers = [
    {
      id: 1,
      name: 'Producto 1',
      status: 'En proceso',
      date: '05-01-2024'
    },
    {
      id: 2,
      name: 'Producto 2',
      status: 'Aceptado',
      date: '10-04-2024'
    },
    {
      id: 3,
      name: 'Producto 3',
      status: 'Rechazado',
      date: '24-09-2024'
    },
  ];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async openModal(askType: 'finalizar'| 'pausar' | 'eliminar') {
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: ModalAskingComponent, 
      mode: 'ios',
      cssClass: 'my-modal',
      showBackdrop: false,
      componentProps: {
        askType: askType,
        title: askType === 'finalizar' ? '¿Realmente desea finalizar esta oferta?' : askType === 'pausar' ?'¿Realmente desea pausar esta oferta?': '¿Realmente desea eliminar esta oferta?',
        subtitle: askType === 'finalizar' ? 'Esta acción es irreversible.' :  'Reactiva en cualquier momento.'
      }
    });
    await modal.present();
  }

  async openExchangeOptions() {
    console.log("openExchangeOptions");
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: ExchangeOptionsComponent,
      mode: 'ios',
      cssClass: 'my-exchanges',
      showBackdrop: false,
    });
    await modal.present();
  }
}
