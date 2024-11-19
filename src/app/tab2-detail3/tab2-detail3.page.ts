import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonFab, IonFabButton, IonLabel, IonItem } from '@ionic/angular/standalone';
import { ModalController, IonicModule } from '@ionic/angular';
import { apertureOutline, bagCheck, bagCheckOutline, chevronBackOutline, chevronForwardOutline,close } from 'ionicons/icons';
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
  @Input() name!: string;
  @Input() category!: string;
  @Input() description!: string;
  @Input() funcionality!: number;
  @Input() is_new!: boolean;
  selectedOption: string = '';
  options: string[] = ['Tecnología', 'Hogar', 'Ropa', 'Otros'];
  interest_categories: string[] = []; 

  addCategory() {
    if (this.selectedOption && !this.interest_categories.includes(this.selectedOption)) {
      this.interest_categories.push(this.selectedOption);
    }
    this.selectedOption = ''; 
  }

  removeCategory(category: string) {
    this.interest_categories = this.interest_categories.filter(cat => cat !== category);
  }
  constructor(private modalCtrl: ModalController) { 
    addIcons({chevronForwardOutline,chevronBackOutline, apertureOutline,close, bagCheckOutline,bagCheck});
  }
  dismissModal() {
    this.modalCtrl.dismiss();
  }
  submitForm() {

    this.modalCtrl.dismiss({
      name: this.name
    });
  }
  async openTab2Detail4() {
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: Tab2Detail4Page,
      componentProps: {
        name: this.name,
        description : this.description,
        category: this.category,
        funcionality: this.funcionality,
        is_new: this.is_new,
        interest_categories: this.interest_categories
      }
    });
    return await modal.present();
  }
  ngOnInit() {
    console.log('Datos recibidos:', this.category, this.name, this.description, this.funcionality, this.is_new, this.interest_categories);
  }

}
