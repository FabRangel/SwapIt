import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCol, IonCard, IonCardSubtitle, IonCardHeader, IonRow, IonList, IonItem, IonText, IonGrid, IonCardTitle, IonCardContent, IonLabel, IonChip, IonIcon } from '@ionic/angular/standalone';
import { add, closeCircle, notifications } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { NotificationService } from '../services/notification.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonIcon, IonChip, IonLabel, IonCardContent, IonCardTitle, IonGrid, IonText, IonItem, IonList, IonRow, IonCardHeader, IonCardSubtitle, IonCard, IonCol, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class Tab4Page implements OnInit {
  notifications: any = [];
  user_id = JSON.parse(localStorage.getItem('user') || '{}')?.id;
   
  
  constructor(private notificationsS: NotificationService, private productS: ProductsService) { 
    addIcons({closeCircle});
  }

  ngOnInit() {
    this.notificationsS.getMessagesByUser(this.user_id).subscribe((data: any) => {
      this.notifications = data;
      console.log('Notifications:', this.notifications);
      this.notifications.forEach((notification: any) => {
        this.productS.getProduct(notification.id_product).subscribe((productData: any) => {
          notification.productData = productData;
          console.log('Notification with Product Data:', notification);
        });
    });
    });
  }

}
