import { Component, Input, OnInit } from '@angular/core';
import {
  IonModal,
  IonIcon,
  IonButton,
  IonButtons,
  IonRow,
  IonCol,
  IonAvatar,
  IonText,
  IonGrid,
  IonToolbar,
  IonChip,
  IonLabel,
  IonTextarea,
  IonItem,
  IonList,
  IonItemOptions,
  IonItemOption,
  IonListHeader,
  IonItemSliding,
  ModalController,
} from '@ionic/angular/standalone';
import { ModalAskingComponent } from '../modal-asking/modal-asking.component';
import { ExchangeOptionsComponent } from '../exchange-options/exchange-options.component';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/services/products.service';
import { OffersService } from 'src/app/services/offers.service';
import { ModalResultComponent } from '../modal-result/modal-result.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss'],
  standalone: true,
  imports: [
    IonItemSliding,
    IonListHeader,
    IonItemOption,
    IonItemOptions,
    ExchangeOptionsComponent,
    ModalAskingComponent,
    IonList,
    IonItem,
    IonTextarea,
    IonLabel,
    IonChip,
    IonToolbar,
    IonGrid,
    IonText,
    IonAvatar,
    IonCol,
    IonRow,
    IonButtons,
    IonButton,
    IonIcon,
    IonModal,
    CommonModule,
  ],
})
export class MyProductsComponent implements OnInit {
  @Input() productId: any | undefined;
  producto: any = {};
  offers: any[] = [];
  acceptedCategories: string[] = [];

  constructor(
    private modalCtrl: ModalController,
    private productS: ProductsService,
    private offerS: OffersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productS.getProduct(this.productId).subscribe((data: any) => {
      console.log('Productito:', data);
      this.producto = data;
      this.fetchAcceptedCategories();
    });
    this.offerS.getOffersByProduct(this.productId).subscribe((data: any) => {
      console.log('Ofertas:', data);
      this.offers = Array.isArray(data.offers) ? data.offers : [];
      console.log('Offers array:', this.offers);
    });
    this.offerS.getOffersByProduct(this.productId).subscribe((data: any) => {
      console.log('Ofertas:', data);
      this.offers = Array.isArray(data.offers) ? data.offers : [];
      console.log('Offers array:', this.offers);
    });
  }

  fetchAcceptedCategories() {
    console.log('categorias ', this.producto.interest_categories);
    this.acceptedCategories = this.producto.interest_categories;
  }

  trackById(index: number, item: any): number {
    return item.id; // Usa el ID único de cada oferta
  }

  async openModal(askType: 'finalizar' | 'pausar' | 'eliminar') {
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: ModalAskingComponent,
      mode: 'ios',
      cssClass: 'my-modal',
      showBackdrop: false,
      componentProps: {
        productId: this.productId,
        askType: askType,
        title:
          askType === 'finalizar'
            ? '¿Realmente desea finalizar esta oferta?'
            : askType === 'pausar'
            ? '¿Realmente desea pausar esta oferta?'
            : '¿Realmente desea eliminar esta oferta?',
        subtitle:
          askType === 'finalizar'
            ? 'Esta acción es irreversible.'
            : 'Reactiva en cualquier momento.',
      },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.confirmed && askType === 'finalizar' ) {
      this.updateStatusToFinalized();
    }
    if (data?.confirmed && askType === 'pausar' ) {
      this.updateStatusToPaused();
    }
  }
  
  updateStatusToFinalized() {
    this.productS
      .updateProduct(this.productId, { status: 'finalizada' })
      .subscribe(
        async (data: any) => {
          console.log('Product updated:', data);
          this.producto = data;
  
          const modal = await this.modalCtrl.create({
            component: ModalResultComponent,
            mode: 'ios',
            cssClass: 'my-modal',
            showBackdrop: false,
            componentProps: {
              title: 'Producto Actualizado',
              message: 'El producto ha sido actualizado exitosamente.',
            },
          });
          await modal.present();
  
          modal.onWillDismiss().then(() => {
            this.reloadPage();
          });
        },
        async (error) => {
          console.error('Error updating product:', error);
  
          const modal = await this.modalCtrl.create({
            component: ModalResultComponent,
            mode: 'ios',
            cssClass: 'my-modal',
            showBackdrop: false,
            componentProps: {
              title: 'Error',
              message: 'No se pudo actualizar el producto. Intente nuevamente.',
            },
          });
          await modal.present();
        }
      );
  }

  updateStatusToPaused() {
    this.productS
      .updateProduct(this.productId, { status: 'en pausa' })
      .subscribe(
        async (data: any) => {
          console.log('Product updated:', data);
          this.producto = data;
  
          const modal = await this.modalCtrl.create({
            component: ModalResultComponent,
            mode: 'ios',
            cssClass: 'my-modal',
            showBackdrop: false,
            componentProps: {
              title: 'Producto Actualizado',
              message: 'El producto ha sido actualizado exitosamente.',
            },
          });
          await modal.present();
  
          modal.onWillDismiss().then(() => {
            this.reloadPage();
          });
        },
        async (error) => {
          console.error('Error updating product:', error);
  
          const modal = await this.modalCtrl.create({
            component: ModalResultComponent,
            mode: 'ios',
            cssClass: 'my-modal',
            showBackdrop: false,
            componentProps: {
              title: 'Error',
              message: 'No se pudo actualizar el producto. Intente nuevamente.',
            },
          });
          await modal.present();
        }
      );
  }

  updateStatusToActive() {
    this.productS
      .updateProduct(this.productId, { status: 'activa' })
      .subscribe(
        async (data: any) => {
          console.log('Product updated:', data);
          this.producto = data;
  
          const modal = await this.modalCtrl.create({
            component: ModalResultComponent,
            mode: 'ios',
            cssClass: 'my-modal',
            showBackdrop: false,
            componentProps: {
              title: 'Producto Actualizado',
              message: 'El producto ha sido actualizado exitosamente.',
            },
          });
          await modal.present();
  
          modal.onWillDismiss().then(() => {
            this.reloadPage();
          });
        },
        async (error) => {
          console.error('Error updating product:', error);
  
          const modal = await this.modalCtrl.create({
            component: ModalResultComponent,
            mode: 'ios',
            cssClass: 'my-modal',
            showBackdrop: false,
            componentProps: {
              title: 'Error',
              message: 'No se pudo actualizar el producto. Intente nuevamente.',
            },
          });
          await modal.present();
        }
      );
  }
  
  reloadPage() {
    // Recargar la página
    location.reload();
  }

  async openExchangeOptions() {
    console.log('openExchangeOptions');
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: ExchangeOptionsComponent,
      mode: 'ios',
      cssClass: 'my-exchanges',
      showBackdrop: false,
    });
    await modal.present();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
