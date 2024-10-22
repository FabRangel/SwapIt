import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFabButton } from '@ionic/angular/standalone';
import { IonicModule, ModalController } from '@ionic/angular';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AceptPage } from '../acept/acept.page';

@Component({
  selector: 'app-tab2-detail4',
  templateUrl: './tab2-detail4.page.html',
  styleUrls: ['./tab2-detail4.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab2Detail4Page implements OnInit {
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
  async openAcept() {
    const modal = await this.modalCtrl.create({
      component: AceptPage,
    });
    return await modal.present();
  }
  ngOnInit() {
  }

}
