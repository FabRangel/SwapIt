import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonSearchbar, IonToggle } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { trashBin, warning, calendar, calendarClear, calendarNumber, calendarOutline, heartCircleOutline, closeCircle, home, pin, star, call, globe, basket, barbell, person, heart, trash, earth, tv, tvOutline, tvSharp, shirtOutline, homeOutline, barbellOutline, extensionPuzzleOutline, earthOutline, heartDislikeCircleOutline, heartDislike } from 'ionicons/icons';
import { ItemDetailComponent } from '../components/item-detail/item-detail.component';
import { ItemOfferComponent } from "../components/item-offer/item-offer.component";
import { MyProductsComponent } from '../components/my-products/my-products.component';
import { MyOfferComponent } from '../components/my-offer/my-offer.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [MyOfferComponent,MyProductsComponent,ItemOfferComponent,ItemDetailComponent, IonSearchbar, IonRow, IonCol, IonGrid, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonToggle, ItemOfferComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1Page {
  constructor() { 
    addIcons({calendarOutline,heartCircleOutline,heartDislikeCircleOutline,heartDislike,earthOutline,tvOutline,shirtOutline,homeOutline,extensionPuzzleOutline,heart,earth,barbellOutline,call,globe,basket,barbell,trash,person,pin,star,tv,home,closeCircle,calendar,warning,trashBin,});
  }
}
