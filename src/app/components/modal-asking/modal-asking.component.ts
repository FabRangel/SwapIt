import { Component, Input, OnInit } from '@angular/core';
import { IonGrid, IonToolbar, IonImg, IonCol, IonRow, IonIcon, IonButton, IonButtons, IonText, ModalController } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { close, closeCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-modal-asking',
  templateUrl: './modal-asking.component.html',
  styleUrls: ['./modal-asking.component.scss'],
  standalone: true,
  imports: [IonText, IonButtons, IonButton, IonIcon, IonRow, IonCol, IonImg, IonToolbar, IonGrid, ],
})
export class ModalAskingComponent  implements OnInit {
  @Input() askType: 'finalizar' | 'pausar' = 'finalizar';
  @Input() title: string = '¿Realmente desea finalizar esta oferta?';
  @Input() subtitle: string = 'Esta acción es irreversible.';
  
  constructor(private modalCtrl : ModalController) {
      addIcons({closeCircleOutline}); }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }
  confirmAction() {
    this.modalCtrl.dismiss({ confirmed: true });
  }

  cancelAction() {
    this.modalCtrl.dismiss({ confirmed: false });
  }

}
