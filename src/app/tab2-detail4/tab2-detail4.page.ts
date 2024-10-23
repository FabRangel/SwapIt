import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFabButton, NavController } from '@ionic/angular/standalone';
import { IonicModule, ModalController } from '@ionic/angular';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ModalResultComponent } from '../components/modal-result/modal-result.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2-detail4',
  templateUrl: './tab2-detail4.page.html',
  styleUrls: ['./tab2-detail4.page.scss'],
  standalone: true,
  imports: [ModalResultComponent,IonicModule, FormsModule, CommonModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab2Detail4Page implements OnInit {
  title: string = '';
  constructor(private modalCtrl: ModalController, private navCtrl: NavController) { 
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
  async openAcept(resultType: 'success'| 'warning' | 'error') {
    const modal = await this.modalCtrl.create({
      component: ModalResultComponent,
      cssClass: 'my-modal',
      componentProps: {
        resultType: resultType,
        title: resultType === 'success' ? 'Publicación exitosa' : 'Error',
        subtitle: resultType === 'success' ? 'Estamos buscando un nuevo hogar para tu producto' :  'Hubo un problema con tu oferta, por favor intenta de nuevo.'
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data?.confirmed) {
      console.log('Publicación confirmada. Cerrar modal y redirigir...');
  
      // Cerrar el modal antes de redirigir
      await this.modalCtrl.dismiss();
  
      // Usar NavController para redirigir
      this.navCtrl.navigateRoot('/tabs/tab1').then(() => {
        console.log('Redirigido a Tab1');
      }).catch(err => {
        console.error('Error en la navegación:', err);
      });
    }
  }



  ngOnInit() {
  }

}
