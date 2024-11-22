import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonSearchbar,
  IonToggle,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import {
  trashBin,
  warning,
  calendar,
  calendarClear,
  calendarNumber,
  calendarOutline,
  heartCircleOutline,
  closeCircle,
  home,
  pin,
  star,
  call,
  globe,
  basket,
  barbell,
  person,
  heart,
  trash,
  earth,
  tv,
  tvOutline,
  tvSharp,
  shirtOutline,
  homeOutline,
  barbellOutline,
  extensionPuzzleOutline,
  earthOutline,
  heartDislikeCircleOutline,
  heartDislike,
} from 'ionicons/icons';
import { ItemDetailComponent } from '../components/item-detail/item-detail.component';
import { ItemOfferComponent } from '../components/item-offer/item-offer.component';
import { MyProductsComponent } from '../components/my-products/my-products.component';
import { MyOfferComponent } from '../components/my-offer/my-offer.component';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    MyOfferComponent,
    MyProductsComponent,
    ItemOfferComponent,
    ItemDetailComponent,
    IonSearchbar,
    IonRow,
    IonCol,
    IonGrid,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonToggle,
    ItemOfferComponent,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab1Page {
  products: any[] = [];
  firstGroupedProducts: any[] = [];
  secondGroupedProducts: any[] = [];
  groupedProducts: any[][] = [];
  recentProducts: any[] = [];
  filteredProducts: any[] = [];
  selectedCategory = 'todo';

  ngOnInit() {}

  constructor(private productS: ProductsService, private favoriteS: FavoritesService) {
    addIcons({
      calendarOutline,
      heartCircleOutline,
      heartDislikeCircleOutline,
      heartDislike,
      earthOutline,
      tvOutline,
      shirtOutline,
      homeOutline,
      extensionPuzzleOutline,
      heart,
      earth,
      barbellOutline,
      call,
      globe,
      basket,
      barbell,
      trash,
      person,
      pin,
      star,
      tv,
      home,
      closeCircle,
      calendar,
      warning,
      trashBin,
    });
    this.products = [];
    this.filteredProducts = [];

    this.productS.getProducts().subscribe((res) => {
      console.log(res);
      if (res && Array.isArray(res)) {
        this.products = res;
        this.filteredProducts = this.products; 
        this.updateGroupedProducts();
      }
    });
    this.productS.getRecentProducts().subscribe((res) => {
      console.log(res);
      if (res && Array.isArray(res)) {
        this.recentProducts = res;
      }
    });
  }

  groupProductsInTwoSections() {
    const midIndex = Math.ceil(this.products.length / 2);

    this.firstGroupedProducts = this.chunkProducts(
      this.products.slice(0, midIndex)
    );
    this.secondGroupedProducts = this.chunkProducts(
      this.products.slice(midIndex)
    );
  }

  chunkProducts(products: any[]) {
    const chunked = [];
    for (let i = 0; i < products.length; i += 3) {
      chunked.push(products.slice(i, i + 3));
    }
    return chunked;
  }

  calculateDaysAgo(dateString: string): string {
    const createdDate = new Date(dateString);
    const currentDate = new Date();
    const diffInTime = currentDate.getTime() - createdDate.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

    if (diffInDays === 0) return 'hoy';
    if (diffInDays === 1) return 'hace 1 día';
    return `hace ${diffInDays} días`;
  }

  onCategoryChange(event: any) {
    const selectedCategory = event.detail.value;
    this.selectedCategory = selectedCategory;

    if (selectedCategory === 'todo') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        (product) => product.category === selectedCategory
      );
    }

    this.updateGroupedProducts();
  }

  updateGroupedProducts() {
    const grouped = this.groupProducts(this.filteredProducts);
    this.firstGroupedProducts = grouped.slice(0, Math.ceil(grouped.length / 2));
    this.secondGroupedProducts = grouped.slice(Math.ceil(grouped.length / 2));
  }

  groupProducts(products: any[]) {
    const groupSize = 3; // Número de productos por fila
    const grouped = [];
    for (let i = 0; i < products.length; i += groupSize) {
      grouped.push(products.slice(i, i + groupSize));
    }
    return grouped;
  }

  onSearch(event: any) {
    const searchTerm = event.target.value?.toLowerCase() || '';
  
    if (!searchTerm) {
      this.onCategoryChange({ detail: { value: this.selectedCategory } });
      return;
    }
    this.filteredProducts = this.products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm) || 
        product.category.toLowerCase().includes(searchTerm) || 
        product.description?.toLowerCase().includes(searchTerm) 
      );
    });
    this.updateGroupedProducts();
  }
  onFavoriteChange(event: any, product: any) {
    const selectedValue = event.detail.value;
  
    if (selectedValue === 'like') {
      this.addToFavorites(product);
    } else if (selectedValue === 'dislike') {
      this.removeFromFavorites(product);
    }
  }
  
  addToFavorites(product: any) {
    console.log('Producto agregado a favoritos:', product);
    const id_user = JSON.parse(localStorage.getItem('user') || '{}')?.id;
    const id_product = product.product_id;
    this.favoriteS.createFavorite({id_product, id_user}).subscribe(() => {
      product.favorites_count += 1; 
      console.log('Producto agregado a la lista de favoritos del usuario.');
    });
  }
  
  removeFromFavorites(product: any) {
    console.log('Producto eliminado de favoritos:', product);
    const id_product = product.product_id;
    this.favoriteS.deleteFavorite(id_product).subscribe(() => {
      product.favorites_count -= 1;
      console.log('Producto eliminado de la lista de favoritos del usuario.');
    });
  }
}
