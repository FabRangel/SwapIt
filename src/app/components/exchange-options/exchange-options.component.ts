import { Component, OnInit } from '@angular/core';
import { IonGrid, IonRow, IonCol, IonList, IonRadioGroup, IonItem, IonRadio, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, ModalController } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { close, closeCircleOutline } from 'ionicons/icons';
import { ModalAskingComponent } from '../modal-asking/modal-asking.component';
import { ModalResultComponent } from '../modal-result/modal-result.component';

@Component({
  standalone: true,
  selector: 'app-exchange-options',
  templateUrl: './exchange-options.component.html',
  styleUrls: ['./exchange-options.component.scss'],
  imports: [ModalAskingComponent,ModalResultComponent,IonLabel, IonIcon, IonButton, IonButtons, IonToolbar, IonRadio, IonItem, IonRadioGroup, IonList, IonCol, IonRow, IonGrid, ],
})
export class ExchangeOptionsComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) {
      addIcons({closeCircleOutline}); }

  ngOnInit() {}

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
  ];

 async close() {
    this.modalCtrl.dismiss();
  }

  async openModalAsking(askType: 'finalizar'| 'pausar' | 'aceptar' ) {
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: ModalAskingComponent, 
      mode: 'ios',
      cssClass: 'my-modal',
      showBackdrop: false,
      componentProps: {
        askType: askType,
        title: askType === 'finalizar' ? '¿Realmente desea finalizar esta oferta?' : askType === 'pausar' ? '¿Realmente desea pausar esta oferta?': '¿Realmente desea aceptar este intercambio?',
        subtitle: askType === 'finalizar' ? 'Esta acción es irreversible.' :  askType === 'pausar' ? 'Reactiva en cualquier momento.' : 'Esta acción es irreversible.'
      }
    });
    await modal.present();
  }
}
