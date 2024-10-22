import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule, ModalController } from '@ionic/angular';
import { chevronBackOutline, chevronForwardOutline, star, starOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Tab2Detail3Page } from '../tab2-detail3/tab2-detail3.page';

@Component({
  selector: 'app-tab2-detail2',
  templateUrl: './tab2-detail2.page.html',
  styleUrls: ['./tab2-detail2.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule ]
})
export class Tab2Detail2Page implements OnInit {
  title: string = '';
  isNewProduct: boolean = false;
  productWorks: boolean = true;
  rating: number = 0;
  constructor(private modalCtrl: ModalController) {
    addIcons({chevronForwardOutline,chevronBackOutline, star,starOutline});
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
  rateProduct(stars: number) {
    this.rating = stars;
  }
  async openTab2Detail3() {
    const modal = await this.modalCtrl.create({
      component: Tab2Detail3Page,
    });
    return await modal.present();
  }
  ngOnInit() {
  }

}
