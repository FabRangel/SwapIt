import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCol, IonCard, IonCardSubtitle, IonCardHeader, IonRow, IonList, IonItem, IonText, IonGrid, IonCardTitle, IonCardContent, IonLabel, IonChip, IonIcon } from '@ionic/angular/standalone';
import { add, closeCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonIcon, IonChip, IonLabel, IonCardContent, IonCardTitle, IonGrid, IonText, IonItem, IonList, IonRow, IonCardHeader, IonCardSubtitle, IonCard, IonCol, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class Tab4Page implements OnInit {
  products = [
    {
      id: 1,
      name: 'Producto 1',
      quality: 'Nuevo',
      status: 'Aceptado',
    },
    {
      id: 2,
      name: 'Producto 2',
      quality: 'Seminuevo',
      status: 'Rechazado',
    },
    {
      id: 3,
      name: 'Producto 3',
      quality: 'Nuevo',
      status: 'Oferta',
    },
    {
      id: 4,
      name: 'Producto 4',
      quality: 'Nuevo',
      status: 'Aceptado',
    },
    {
      id: 5,
      name: 'Producto 5',
      quality: 'Seminuevo',
      status: 'Rechazado',
    },
    {
      id: 6,
      name: 'Producto 6',
      quality: 'Nuevo',
      status: 'Oferta',
    },
    {
      id: 7,
      name: 'Producto 7',
      quality: 'Seminuevo',
      status: 'Rechazado',
    },
    {
      id: 8,
      name: 'Producto 8',
      quality: 'Nuevo',
      status: 'Oferta',
    },
  ];
  
  constructor() { 
    addIcons({closeCircle});
  }

  ngOnInit() {
  }

}
