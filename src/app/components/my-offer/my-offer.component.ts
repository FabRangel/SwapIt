import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonCol, IonModal, IonGrid, IonToolbar, IonButtons, IonButton, IonIcon, IonRow, IonAvatar, IonText, IonChip, IonLabel, IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption, IonListHeader, ModalController} from "@ionic/angular/standalone";
import { ModalAskingComponent } from '../modal-asking/modal-asking.component';
import { ProductsService } from 'src/app/services/products.service';
import { OffersService } from 'src/app/services/offers.service';
import { CommonModule } from '@angular/common';
import { ModalResultComponent } from '../modal-result/modal-result.component';

@Component({
  standalone: true,
  selector: 'app-my-offer',
  templateUrl: './my-offer.component.html',
  styleUrls: ['./my-offer.component.scss'],
  imports: [ModalAskingComponent,IonListHeader, IonItemOption, IonItemOptions, IonItemSliding, IonItem, IonList, IonLabel, IonChip, IonText, IonAvatar, IonRow, IonIcon, IonButton, IonButtons, IonToolbar, IonGrid, IonModal, IonCol, CommonModule],
})
export class MyOfferComponent  implements OnInit {
  @ViewChild('modal') modal!: IonModal;
  @Input() offerId: any | undefined;
  oferta: any = {};
  offers = [];
  acceptedCategories: string[] = [];

  constructor(private modalCtrl: ModalController, private productS: ProductsService, private offerS : OffersService) { 
   
  }

  ngOnInit() {
    console.log('Opening Offer:', this.offerId);
    this.offerS.getOffer(this.offerId).subscribe((data: any) => {
      this.oferta = data;
      
      this.productS.getProduct(this.oferta.id_product).subscribe((productData: any) => {
        this.oferta.productData = productData;
    
        this.fetchAcceptedCategories();
        this.productS.getProduct(this.oferta.id_product_offered).subscribe((productDataOffered: any) => {
          this.oferta.productDataOffered = productDataOffered;
    
          console.log('Oferta completa:', this.oferta);

        });
      });

    });

  }

  fetchAcceptedCategories() {
    if (this.oferta.productData && this.oferta.productData.interest_categories) {
      console.log('Interest Categories:', this.oferta.productData.interest_categories);
      this.acceptedCategories = this.oferta.productData.interest_categories;
    } else {
      console.warn('Interest categories no están disponibles');
    }
  }

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

    const { data } = await modal.onWillDismiss();
    if (data?.confirmed ) {
      this.updateStatusToFinalized();
    }
  }

  updateStatusToFinalized() {
    console.log('Deleting offer:', this.offerId);
    this.offerS
      .deleteOffer(this.offerId)
      .subscribe(
        async (data: any) => {
          console.log('Product deleted:', data);
          this.oferta = data;
          const modal = await this.modalCtrl.create({
            component: ModalResultComponent,
            mode: 'ios',
            cssClass: 'my-modal',
            showBackdrop: false,
            componentProps: {
              title: 'Oferta Eliminada',
              subtitle: 'La oferta ha sido eliminada exitosamente.',
            },
          });
          await modal.present();
  
          modal.onWillDismiss().then(() => {
            this.reloadPage();
          });
        },
        async (error) => {
          console.error('Error updating offer:', error);
  
          const modal = await this.modalCtrl.create({
            component: ModalResultComponent,
            mode: 'ios',
            cssClass: 'my-modal',
            showBackdrop: false,
            componentProps: {
              title: 'Error',
              subtitle: 'No se pudo eliminar la oferta. Intente nuevamente.',
              resultType: 'error',
            },
          });
          await modal.present();
        }
      );
  }

  reloadPage() {
    window.location.reload();
  }

  close(){
    this.modalCtrl.dismiss();
  }
}
