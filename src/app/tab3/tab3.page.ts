import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonText, IonCard, IonCol, IonRow, IonIcon, IonButton, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCardContent, IonChip, IonLabel, IonList, IonAvatar, IonItem, IonSegment, IonSegmentButton, IonThumbnail, ModalController } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { bagCheck, closeCircle, star, starOutline, heart, logoIonic, bag, closeCircleOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { MyProductsComponent } from '../components/my-products/my-products.component';
import { MyOfferComponent } from '../components/my-offer/my-offer.component';
import { ProductsService } from '../services/products.service';
import { DatePipe } from '@angular/common';
import { OffersService } from '../services/offers.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [MyOfferComponent, MyProductsComponent, CommonModule, IonThumbnail, IonSegmentButton, IonSegment, IonItem, IonAvatar, IonList, IonLabel, IonChip, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, IonRow, IonCol, IonCard, IonText, IonGrid, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, CommonModule],
})
export class Tab3Page {
  publicaciones: any[] = [];
  ofertas: any[] = [];
  selectedStatusFilter: string[] = ['activa', 'finalizada', 'en pausa'];
  filteredPublicaciones: any[] = []; 
  selectedStatusFilterOffer: string[] = ['aceptada', 'rechazada', 'en curso'];
  filteredOffers: any[] = []; 
  selectedSegment: string = 'publicaciones';
  user: any = {};
  count: number = 0;

  constructor(
    private productsS: ProductsService,
    private offerS: OffersService,
    private usersS: UsersService,
    private modalCtrl: ModalController,
    private datePipe: DatePipe
  ) {
    addIcons({ bag, logoIonic, heart, closeCircle, bagCheck, starOutline, star, closeCircleOutline });

    const id_user = JSON.parse(localStorage.getItem('user') || '{}')?.id;

    // Cargar productos y filtrar inmediatamente después
    this.productsS.getProductsWithOffersCount(id_user).subscribe((data: any) => {
      console.log('Products loaded:', data);
      this.publicaciones = data;
      this.filterPublicaciones(); // Actualizar los productos filtrados
    });

    // Cargar ofertas
    this.offerS.getOffersByUser(id_user).subscribe((data: any) => {
      this.ofertas = data;

      console.log('Offers loaded:', this.ofertas);
      this.ofertas.forEach((oferta) => {
        this.productsS.getProduct(oferta.id_product).subscribe((productData: any) => {
          oferta.productData = productData; // Asociar el producto con la oferta
          console.log('Updated Offer with Product Data:', oferta);
        });
      });
      this.ofertas.forEach((oferta) => {
        this.productsS.getProduct(oferta.id_product_offered).subscribe((productData: any) => {
          oferta.productOferedData = productData; // Asociar el producto con la oferta
          console.log('Updated Offer with Product Offered Data:', oferta);
        });
      });
      this.filterOffer();
    });


    // Cargar usuario
    this.usersS.getUser(id_user).subscribe((data: any) => {
      console.log('User loaded:', data);
      this.user = data;
    });

    // Cargar contador de productos
    this.productsS.getProductsCountbyUser(id_user).subscribe((data: any) => {
      console.log('Products count:', data);
      this.count = data;
    });
  }

  ngOnInit() {

  }

  onSegmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  getItemClass(status: string): string {
    switch (status) {
      case 'activa':
      case 'aceptada':
        return 'item-accepted';
      case 'en pausa':
      case 'en curso':
        return 'item-paused';
      case 'finalizada':
      case 'rechazada':
        return 'item-rejected';
      default:
        return '';
    }
  }

  toggleStatusFilter(status: string) {
    const index = this.selectedStatusFilter.indexOf(status);
    if (index > -1) {
      this.selectedStatusFilter.splice(index, 1);
    } else {
      this.selectedStatusFilter.push(status);
    }

    console.log('Selected Filters:', this.selectedStatusFilter);
    this.filterPublicaciones();
  }

  isStatusActive(status: string): boolean {
    return this.selectedStatusFilter.includes(status);
  }

  filterPublicaciones() {
    console.log('Filtering publications...');
    console.log('Before Filter:', this.publicaciones);

    if (this.selectedStatusFilter.length === 0) {
      this.filteredPublicaciones = this.publicaciones; // Si no hay filtros activos, muestra todo
      return;
    }

    this.filteredPublicaciones = this.publicaciones.filter(item =>
      this.selectedStatusFilter.includes(item.status)
    );

    console.log('After Filter:', this.filteredPublicaciones);
  }

  async openMyOffer() {
    const modal = await this.modalCtrl.create({
      component: MyOfferComponent,
     
    });

    await modal.present();
  }

  async openMyProduct(productId: number) {
    const modal = await this.modalCtrl.create({
      component: MyProductsComponent,
      cssClass: 'my-modal',
      showBackdrop: false,
      componentProps: {
        productId: productId
      }
    });

    await modal.present();
  }

  //Filtrar ofertas
  toggleStatusFilterOffer(status: string) {
    const index = this.selectedStatusFilterOffer.indexOf(status);
    if (index > -1) {
      this.selectedStatusFilterOffer.splice(index, 1);
    } else {
      this.selectedStatusFilterOffer.push(status);
    }

    console.log('Selected Filters:', this.selectedStatusFilterOffer);
    this.filterOffer();
  }

  isStatusActiveOffer(status: string): boolean {
    return this.selectedStatusFilterOffer.includes(status);
  }

  filterOffer() {
    console.log('Before Filter:', this.ofertas);

    if (this.selectedStatusFilterOffer.length === 0) {
      this.filteredOffers = this.ofertas; // Si no hay filtros activos, muestra todo
      return;
    }

    this.filteredOffers = this.ofertas.filter(item =>
      this.selectedStatusFilterOffer.includes(item.status_offer)
    );
    
    console.log('After Filter:', this.filteredOffers);
  }
}