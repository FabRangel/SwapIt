import { Component, Input, OnInit } from '@angular/core';
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
  is_new: boolean = false;
  funcionality: number = 0;
  @Input() category!: string;
  @Input() description!: string;
  @Input() name!: string;

  constructor(private modalCtrl: ModalController) {
    addIcons({chevronForwardOutline,chevronBackOutline, star,starOutline});
   }
   dismissModal() {
    this.modalCtrl.dismiss();
  }
  submitForm() {
    
    this.modalCtrl.dismiss({
      name: this.name
    });
  }
  rateProduct(stars: number) {
    this.funcionality = stars;
  }
  async openTab2Detail3() {
    console.log("funcionality antes de abrir modal:", this.funcionality)
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: Tab2Detail3Page,
      componentProps: {
        name: this.name,
        description : this.description,
        category: this.category,
        funcionality: this.funcionality,
        is_new: this.is_new,
      }
    });
    return await modal.present();
  }
  ngOnInit() {
    console.log('Datos recibidos:', this.category, this.name, this.description, this.funcionality, this.is_new);
  }

}
