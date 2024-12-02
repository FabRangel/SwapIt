import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonText, IonCard, IonCol, IonRow, IonIcon, IonButton, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCardContent, IonChip, IonLabel, IonList, IonAvatar, IonItem, IonSegment, IonSegmentButton, IonThumbnail } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { bagCheck, closeCircle, star, starOutline, heart, logoIonic, bag, closeCircleOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { MyProductsComponent } from '../components/my-products/my-products.component';
import { MyOfferComponent } from '../components/my-offer/my-offer.component';
import { ProductsService } from '../services/products.service';
import { DatePipe } from '@angular/common';
import { OffersService } from '../services/offers.service';

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
  selectedSegment: string = 'publicaciones';

  constructor(
    private productsS: ProductsService,
    private offerS: OffersService,
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
      console.log('Offers loaded:', data);
      this.ofertas = data;
    });
  }

  ngOnInit() {
    // No necesitas llamar a filterPublicaciones aquí si se llama después de cargar los datos
  }

  onSegmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  getItemClass(status: string): string {
    switch (status) {
      case 'activa':
      case 'aceptado':
        return 'item-accepted';
      case 'en pausa':
      case 'curso':
        return 'item-paused';
      case 'finalizada':
      case 'rechazado':
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
}