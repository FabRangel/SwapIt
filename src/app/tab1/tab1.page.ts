import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonSearchbar, IonToggle } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { trashBin, warning, calendar, calendarClear, calendarNumber, calendarOutline, heartCircleOutline, closeCircle } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonRow, IonCol, IonGrid, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonToggle],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1Page {
  constructor() { 
    addIcons({calendarOutline,heartCircleOutline,closeCircle,calendar,warning,trashBin});
  }
}
