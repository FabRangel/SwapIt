import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonText, IonCard, IonCol, IonRow, IonIcon, IonButton, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCardContent, IonChip, IonLabel, IonList, IonAvatar, IonItem, IonSegment, IonSegmentButton, IonThumbnail } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { bagCheck, closeCircle, star, starOutline, heart, logoIonic, bag, closeCircleOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { MyProductsComponent } from '../components/my-products/my-products.component';
import { MyOfferComponent } from '../components/my-offer/my-offer.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [MyOfferComponent,MyProductsComponent,CommonModule,IonThumbnail,IonSegmentButton, IonSegment, IonItem, IonAvatar, IonList, IonLabel, IonChip, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, IonRow, IonCol, IonCard, IonText, IonGrid, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab3Page {
  publicaciones = [
    {
      id: 1,
      name: 'Producto 1',
      quality: 'Nuevo',
      offers: '3',
      date: '13-Marzo',
      status: 'activo'
    },
    {
      id: 2,
      name: 'Producto 2',
      quality: 'Seminuevo',
      offers: '2',
      date: '21-Marzo',
      status: 'pausa'
    },
    {
      id: 3,
      name: 'Producto 3',
      quality: 'Nuevo',
      offers: '1',
      date: '05-Mayo',
      status: 'finalizado'
    },
    {
      id: 4,
      name: 'Producto 4',
      quality: 'Nuevo',
      offers: '0',
      date: '13-Mayo',
      status: 'activo'
    },
    {
      id: 5,
      name: 'Producto 5',
      quality: 'Seminuevo',
      offers: '5',
      date: '11-Junio',
      status: 'activo'
    },
    {
      id: 6,
      name: 'Producto 6',
      quality: 'Nuevo',
      offers: '1',
      date: '17-Julio',
      status: 'finalizado'
    },
    {
      id: 7,
      name: 'Producto 7',
      quality: 'Seminuevo',
      offers: '4',
      date: '02-Agosto',
      status: 'pausa'
    },
  ];
  ofertas = [
    {
      id: 1,
      name: 'Producto 1',
      quality: 'Nuevo',
      offer: 'Producto ofertado',
      date: '13-Marzo',
      status: 'aceptado'
    },
    {
      id: 2,
      name: 'Producto 2',
      quality: 'Seminuevo',
      offer: 'Producto ofertado',
      date: '21-Marzo',
      status: 'rechazado'
    },
    {
      id: 3,
      name: 'Producto 3',
      quality: 'Nuevo',
      offer: 'Producto ofertado',
      date: '05-Mayo',
      status: 'curso'
    },
    {
      id: 4,
      name: 'Producto 4',
      quality: 'Nuevo',
      offer: 'Producto ofertado',
      date: '13-Mayo',
      status: 'aceptado'
    },
    {
      id: 5,
      name: 'Producto 5',
      quality: 'Seminuevo',
      offer: 'Producto ofertado',
      date: '11-Junio',
      status: 'rechazado',
    },
    {
      id: 6,
      name: 'Producto 6',
      quality: 'Nuevo',
      offer: 'Producto ofertado',
      date: '17-Julio',
      status: 'rechazado'
    },
    {
      id: 7,
      name: 'Producto 7',
      quality: 'Seminuevo',
      offer: 'Producto ofertado',
      date: '02-Agosto',
      status: 'curso'
    },
  ];
  constructor() {
    addIcons({bag,logoIonic,heart,closeCircle,bagCheck,starOutline,star,closeCircleOutline});
  }
  selectedSegment: string = 'publicaciones'; 

  onSegmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }
  getItemClass(status: string): string {
    switch (status) {
      case 'activo':
      case 'aceptado':
        return 'item-accepted';
      case 'pausa':
      case 'curso':
        return 'item-paused';
      case 'finalizado':
      case 'rechazado':
        return 'item-rejected';
      default:
        return '';
    }
  }
}
