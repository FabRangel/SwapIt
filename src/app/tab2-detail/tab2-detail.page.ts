import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonTabs, IonButtons, IonButton, IonCardHeader,IonCardTitle } from '@ionic/angular/standalone';
import { ModalController, IonicModule } from '@ionic/angular';
import { chevronForwardOutline, chevronBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Tab2Detail1Page } from '../tab2-detail1/tab2-detail1.page';

@Component({
  selector: 'app-tab2-detail',
  templateUrl: './tab2-detail.page.html',
  styleUrls: ['./tab2-detail.page.scss'],
  standalone: true,
  imports: [IonicModule,FormsModule, CommonModule ]
})
export class Tab2DetailPage implements OnInit {
  name: string = '';
  @Input() category!: string;

  constructor(private modalCtrl: ModalController) {
    addIcons({chevronForwardOutline,chevronBackOutline});
   }
  dismissModal() {
    this.modalCtrl.dismiss();
  }
  submitForm() {
    if (this.name.trim() === '') {
      console.log('El título no puede estar vacío.');
      return;
    }

    console.log('Título de la publicación:', this.name);

    // Cerrar el modal después de enviar
    this.modalCtrl.dismiss({
      name: this.name
    });
  }
  async openTab2Detail1() {
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: Tab2Detail1Page,
      componentProps: {
        category: this.category,
        name : this.name,
      }
    });
    return await modal.present();
  }

  ngOnInit() {
    console.log('Categoría recibida:', this.category);
  }

}
