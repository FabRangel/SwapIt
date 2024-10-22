import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonFab, IonFabButton, IonLabel, IonItem } from '@ionic/angular/standalone';
import { ModalController, IonicModule } from '@ionic/angular';
import { apertureOutline, chevronBackOutline, chevronForwardOutline,close } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Tab2Detail4Page } from '../tab2-detail4/tab2-detail4.page';

@Component({
  selector: 'app-tab2-detail3',
  templateUrl: './tab2-detail3.page.html',
  styleUrls: ['./tab2-detail3.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class Tab2Detail3Page implements OnInit {
  title: string = '';
  selectedOption: string = '';
  options: string[] = ['Tecnologias y Electronicos', 'Hogar', 'Vehiculos'];
  constructor(private modalCtrl: ModalController) { 
    addIcons({chevronForwardOutline,chevronBackOutline, apertureOutline,close});
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
  async openTab2Detail4() {
    const modal = await this.modalCtrl.create({
      component: Tab2Detail4Page,
    });
    return await modal.present();
  }
  ngOnInit() {
  }

}
