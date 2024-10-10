import { Component, OnInit } from '@angular/core';
import { IonCol, IonModal, IonGrid, IonToolbar, IonButtons, IonButton, IonIcon, IonRow, IonAvatar, IonText, IonChip, IonLabel, IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption, IonListHeader, ModalController } from "@ionic/angular/standalone";
import { ModalAskingComponent } from '../modal-asking/modal-asking.component';

@Component({
  standalone: true,
  selector: 'app-my-offer',
  templateUrl: './my-offer.component.html',
  styleUrls: ['./my-offer.component.scss'],
  imports: [ModalAskingComponent,IonListHeader, IonItemOption, IonItemOptions, IonItemSliding, IonItem, IonList, IonLabel, IonChip, IonText, IonAvatar, IonRow, IonIcon, IonButton, IonButtons, IonToolbar, IonGrid, IonModal, IonCol, ],
})
export class MyOfferComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

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

  async openModal(askType: any) {
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: ModalAskingComponent, 
      mode: 'ios',
      cssClass: 'my-modal',
      showBackdrop: false,
      componentProps: {
        askType: askType,
        title: askType==='eliminar' ?'¿Realmente desea eliminar esta oferta?':'',
        subtitle: askType==='eliminar' ? 'Esta acción es irreversible.':'',
      }
    });
    modal.present();
  }
}
