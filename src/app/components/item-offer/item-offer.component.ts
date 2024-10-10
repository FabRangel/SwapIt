import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonModal, IonGrid,IonCard, IonToolbar, IonButtons, IonIcon, IonCol, IonRow, IonButton, IonAvatar, IonText, IonChip, IonLabel, IonTextarea, IonItem, IonInput, IonRadioGroup, IonRadio, ModalController } from "@ionic/angular/standalone";
import { ModalResultComponent } from '../modal-result/modal-result.component';

@Component({
  selector: 'app-item-offer',
  templateUrl: './item-offer.component.html',
  styleUrls: ['./item-offer.component.scss'],
  standalone: true,
  imports: [ModalResultComponent,IonCard,CommonModule,IonRadio, IonRadioGroup, IonInput, IonItem, IonTextarea, IonLabel, IonChip, IonText, IonAvatar, IonButton, IonRow, IonCol, IonIcon, IonButtons, IonToolbar, IonGrid, IonModal,  ],
})
export class ItemOfferComponent  implements OnInit {

  constructor(private modalCtrl : ModalController) { 
    console.log("ItemOfferComponent constructor");
  }

  ngOnInit() {}

  rating = 0;  

  setRating(stars: number) {
    this.rating = stars; 
  }

  async openclose(){
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: ModalResultComponent,
    });
    return await modal.present();
  }

  selectedChip: string | null = null; 
  categories: string[] = ['Hogar', 'Electrónicos', 'Ropa', 'Otros']; 

  selectChip(category: string) {
    this.selectedChip = category; 
  }

  close(){
    this.modalCtrl.dismiss();
  }
  async openResultModal(resultType: 'success'| 'warning' | 'error') {
    this.modalCtrl.dismiss(); 
  
    const modal = await this.modalCtrl.create({
      component: ModalResultComponent,
      mode: 'ios',
      cssClass: 'my-modal',
      showBackdrop: false,
      componentProps: {
        resultType: resultType,
        title: resultType === 'success' ? 'Oferta exitosa' : 'Error',
        subtitle: resultType === 'success' ? 'Estamos buscando un nuevo hogar para tu producto' :  'Hubo un problema con tu oferta, por favor intenta de nuevo.'
      }
    });
  
    await modal.present(); 
    setTimeout(() => {
      modal.dismiss(); 
    }, 4000);
  }
  
}
