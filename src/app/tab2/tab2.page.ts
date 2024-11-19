import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonSearchbar, IonToggle } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { trashBin, warning, calendar, calendarClear, calendarNumber, calendarOutline, heartCircleOutline, closeCircle, home, pin, star, call, globe, basket, barbell, person, heart, trash, earth, tv, tvOutline, tvSharp, shirtOutline, homeOutline, barbellOutline, extensionPuzzleOutline, earthOutline, heartDislikeCircleOutline, heartDislike, headset, shirt, extensionPuzzle } from 'ionicons/icons';
import { ItemDetailComponent } from '../components/item-detail/item-detail.component';
import { RouterLink} from '@angular/router';
import { ModalController, IonicModule } from '@ionic/angular';
import { Tab2DetailPage } from '../tab2-detail/tab2-detail.page';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab2Page {
  category!: string ;
  constructor(private modalCtrl: ModalController) {
    addIcons({headset,home, shirt, extensionPuzzle});
  }
  async openTab2Detail() {
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: Tab2DetailPage,
    });
    return await modal.present();
  }
  async selectCategory(category: string) {
    this.category = category;
    console.log('Categoría seleccionada: ', this.category);
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: Tab2DetailPage,
      componentProps: {
        category: this.category, 
      },
    });
    return await modal.present();
  }

  
}
