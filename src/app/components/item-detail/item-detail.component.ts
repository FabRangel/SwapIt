import { Component, inject, OnInit } from '@angular/core';
import { IonAlert, IonContent, IonItem, IonModal, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonCheckbox, IonInput, IonGrid, IonRow, IonCol, IonAvatar, IonIcon, IonText, IonChip, IonLabel, IonTextarea,ModalController} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { close, closeCircle, closeCircleOutline, starOutline } from 'ionicons/icons';
import { ItemOfferComponent } from '../item-offer/item-offer.component';
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  standalone: true,
  imports: [ItemOfferComponent,IonTextarea, IonLabel, IonChip, IonText, IonIcon, IonAvatar, IonCol, IonRow, IonGrid, IonInput, IonCheckbox, IonButton, IonButtons, IonToolbar, IonTitle, IonHeader, IonModal, IonItem, IonContent, IonAlert, ],
})
export class ItemDetailComponent  implements OnInit {

  constructor(
    private modalCtrl : ModalController
  ) {
    addIcons({closeCircleOutline,starOutline,closeCircle,close});
   }
   
  ngOnInit() {
  }

  rating = 3;  

  setRating(stars: number) {
    this.rating = stars; 
  }

  async openclose() {
    this.modalCtrl.dismiss();
      const modal = await this.modalCtrl.create({
        component: ItemOfferComponent,
        mode: 'ios',
        cssClass: 'my-modal',
        showBackdrop: false,
      });
      await modal.present();
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
}
