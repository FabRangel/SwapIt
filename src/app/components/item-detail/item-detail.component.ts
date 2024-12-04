import { Component, inject, Input, OnInit } from '@angular/core';
import { IonAlert, IonContent, IonItem, IonModal, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonCheckbox, IonInput, IonGrid, IonRow, IonCol, IonAvatar, IonIcon, IonText, IonChip, IonLabel, IonTextarea,ModalController} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { close, closeCircle, closeCircleOutline, starOutline } from 'ionicons/icons';
import { ItemOfferComponent } from '../item-offer/item-offer.component';
import { ProductsService } from 'src/app/services/products.service';
import { CommonModule, DatePipe } from '@angular/common';
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [ItemOfferComponent,IonTextarea, IonLabel, IonChip, IonText, IonIcon, IonAvatar, IonCol, IonRow, IonGrid, IonInput, IonCheckbox, IonButton, IonButtons, IonToolbar, IonTitle, IonHeader, IonModal, IonItem, IonContent, IonAlert, CommonModule ],
})
export class ItemDetailComponent  implements OnInit {
  @Input() productId: any | undefined; 
  product: any = {};
  acceptedCategories: string[] = [];

  constructor(
    private modalCtrl : ModalController,
    private productS: ProductsService,
    private datePipe: DatePipe
  ) {
    addIcons({closeCircleOutline,starOutline,closeCircle,close});
   }
   
  ngOnInit() {
    console.log('Opening Product:', this.productId);
    this.productS.getProduct(this.productId).subscribe((data: any) => {
      this.product = data;
      console.log('Product:', this.product);
      this.fetchAcceptedCategories();
    });
  }

  fetchAcceptedCategories() {
    if (this.product.interest_categories) {
      console.log('Interest Categories:', this.product.interest_categories);
      this.acceptedCategories = this.product.interest_categories;
    } else {
      console.warn('Interest categories no están disponibles');
    }
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
