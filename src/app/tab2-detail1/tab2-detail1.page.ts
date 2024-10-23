import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronForwardOutline, chevronBackOutline } from 'ionicons/icons';
import { Tab2Detail2Page } from '../tab2-detail2/tab2-detail2.page';

@Component({
  selector: 'app-tab2-detail1',
  templateUrl: './tab2-detail1.page.html',
  styleUrls: ['./tab2-detail1.page.scss'],
  standalone: true,
  imports: [IonicModule ]
})
export class Tab2Detail1Page implements OnInit {
  title: string = '';

  constructor(private modalCtrl: ModalController) {
    addIcons({chevronForwardOutline,chevronBackOutline});
   }
   dismissModal() {
    this.modalCtrl.dismiss();
  }
  submitForm() {
    if (this.title.trim() === '') {
      console.log('El título no puede estar vacío.');
      return;
    }

    // Aquí puedes manejar lo que sucede al enviar el formulario
    console.log('Título de la publicación:', this.title);

    // Cerrar el modal después de enviar
    this.modalCtrl.dismiss({
      title: this.title
    });
  }
  async openTab2Detail2() {
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: Tab2Detail2Page,
    });
    return await modal.present();
  }
  ngOnInit() {
  }

}
