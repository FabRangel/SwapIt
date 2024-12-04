import { Component, Input, OnInit } from '@angular/core';
import { IonGrid, IonRow, IonCol, IonList, IonRadioGroup, IonItem, IonRadio, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, ModalController } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { close, closeCircleOutline, notifications } from 'ionicons/icons';
import { ModalAskingComponent } from '../modal-asking/modal-asking.component';
import { ModalResultComponent } from '../modal-result/modal-result.component';
import { ProductsService } from 'src/app/services/products.service';
import { OffersService } from 'src/app/services/offers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  standalone: true,
  selector: 'app-exchange-options',
  templateUrl: './exchange-options.component.html',
  styleUrls: ['./exchange-options.component.scss'],
  imports: [ModalAskingComponent,ModalResultComponent,IonLabel, IonIcon, IonButton, IonButtons, IonToolbar, IonRadio, IonItem, IonRadioGroup, IonList, IonCol, IonRow, IonGrid, CommonModule, FormsModule],
})
export class ExchangeOptionsComponent  implements OnInit {
  @Input() productId: any | undefined;
  offers: any = [];
  selectedOfferId!: any  ;
  id_recipient! : any;
  id_user = JSON.parse(localStorage.getItem('user') || '{}')?.id;

  constructor(private modalCtrl: ModalController, private productS: ProductsService, private offerS: OffersService, private notificationsS: NotificationService) {
      addIcons({closeCircleOutline}); 
    }

  ngOnInit() {
    this.offerS.getOffersByProduct(this.productId).subscribe((data: any) => {
      this.offers = data;
      this.offers.forEach((offer: any) => {
        this.productS.getProduct(offer.id_product_offered).subscribe((productDataOffered: any) => {
          offer.productDataOffered = productDataOffered;
          console.log('Oferta completa:', offer);
          this.selectedOfferId = offer.id;
          this.id_recipient = offer.id_user_offer;
        });
      });
    });
  }

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

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.updateOffer();
    }
  }

  updateOffer() {
    console.log('Oferta seleccionada:', this.selectedOfferId);
  
    // Actualizar el estado de la oferta seleccionada a "aceptado"
    this.offerS.updateOffer(this.selectedOfferId, { status: 'aceptado' }).subscribe((data: any) => {
      console.log('Oferta actualizada:', data);
  
      // Obtener la información de la oferta aceptada
      this.offerS.getOffer(this.selectedOfferId).subscribe((acceptedOffer: any) => {
        this.id_recipient = acceptedOffer.id_user_offer;
  
        // Crear notificación para el usuario cuya oferta fue aceptada
        this.notificationsS.createMessage({
          id_recipient: this.id_recipient,
          id_user: this.id_user,
          description: 'Tu oferta ha sido aceptada',
          message_type: 'aceptado',
          id_product: this.productId,
        }).subscribe(
          (data: any) => {
            console.log('Notificación de aceptación:', data);
          },
          (error: any) => {
            console.error('Error creando notificación de aceptación:', error);
          }
        );
  
        // Enviar notificaciones de rechazo a los demás usuarios
        this.offers.forEach((offer: any) => {
          if (offer.id !== this.selectedOfferId) {
            this.notificationsS.createMessage({
              id_recipient: offer.id_user_offer,
              id_user: this.id_user,
              description: 'Tu oferta ha sido rechazada',
              message_type: 'rechazado',
              id_product: this.productId,
            }).subscribe(
              (data: any) => {
                console.log('Notificación de rechazo:', data);
              },
              (error: any) => {
                console.error('Error creando notificación de rechazo:', error);
              }
            );
  
            // Opcional: Actualizar el estado de las ofertas rechazadas
            this.offerS.updateOffer(offer.id, { status: 'rechazado' }).subscribe(
              (data: any) => {
                console.log('Oferta rechazada actualizada:', data);
              },
              (error: any) => {
                console.error('Error actualizando oferta rechazada:', error);
              }
            );
          }
        });
  
        // Modificar el estado del producto a "finalizada"
        this.productS.updateProduct(this.productId, { status: 'finalizada' }).subscribe((data: any) => {
          console.log('Producto actualizado:', data);
        });
  
        this.modalCtrl.dismiss();
        setTimeout(() => {
          window.location.reload(); 
        }, 5000)
      });
    });
  }
  
  reload() {
    window.location.reload();
  }

}
