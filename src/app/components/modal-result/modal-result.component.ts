import { Component, Input, OnInit } from '@angular/core';
import { IonModal, IonGrid, IonToolbar, IonButtons, IonIcon, IonButton, IonCol, IonRow, IonImg, IonText, ModalController } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { closeCircleOutline, close } from 'ionicons/icons';


@Component({
  selector: 'app-modal-result',
  templateUrl: './modal-result.component.html',
  styleUrls: ['./modal-result.component.scss'],
  standalone: true,
  imports: [IonText, IonImg, IonRow, IonCol, IonButton, IonIcon, IonButtons, IonToolbar, IonGrid, IonModal, ],
})
export class ModalResultComponent  implements OnInit {
  @Input() resultType: 'success' | 'warning' | 'error'  = 'success';
  @Input() title: string = '¡Operación exitosa!';
  @Input() subtitle: string = 'Tu operación fue realizada correctamente.';
  
  constructor(private modalCtrl: ModalController) {
    addIcons({closeCircleOutline});
   }

  ngOnInit() {}

  getImageSrc(): string {
    let imageSrc = '';
    if (this.resultType === 'success') {
      imageSrc = '../../../assets/images/success.png';
    } else if (this.resultType === 'warning') {
      imageSrc = '../../../assets/images/warning.png';
    } else if (this.resultType === 'error') {
      imageSrc = '../../../assets/images/wrong.png';
    } 
    return imageSrc;
  }

  getResultTitle(): string {
    let resultTitle = '';
    if (this.resultType === 'success') {
      resultTitle = 'Oferta exitosa';
    } else if (this.resultType === 'warning') {
      resultTitle = '¿Realmente desea eliminar?';
    } else if (this.resultType === 'error') {
      resultTitle = 'Error';
    } 
    return resultTitle;
  }
  getResultSubtitle(): string {
    let resultSubtitle = '';
    if (this.resultType === 'success') {
      resultSubtitle = 'Estamos buscando un nuevo hogar para tu producto';
    } else if (this.resultType === 'warning') {
      resultSubtitle = '¿Realmente desea eliminar?';
    } else if (this.resultType === 'error') {
      resultSubtitle = 'Hubo un problema con tu oferta, por favor intenta de nuevo.';
    } 
    return resultSubtitle;
  }

  closeModal() {
    this.modalCtrl.dismiss({
      confirmed: true, 
    });
  }
}
