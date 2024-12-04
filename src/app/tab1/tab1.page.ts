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
  ModalController,
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

  constructor(
    private productS: ProductsService,
    private favoriteS: FavoritesService,
    private modalCtrl: ModalController
  ) {
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
        this.recentProducts = res.map((product) => ({
          ...product,
          isFavorited: product.isFavorited || false, 
        }));
      }
    });
  }

  groupProductsInTwoSections() {
      const midIndex = Math.floor(this.products.length / 2);  
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
    console.log(selectedCategory);
    if (selectedCategory === 'todo') {
      this.filteredProducts = this.products;
      console.log('Todos los productos:', this.filteredProducts);
    } else {
      this.filteredProducts = this.products.filter(
        (product) => product.category === selectedCategory
      );

      console.log('Productos filtrados:', this.filteredProducts);
    }

    this.updateGroupedProducts();
  }

  updateGroupedProducts() {
    const midIndex = Math.floor(this.filteredProducts.length / 2);
  this.firstGroupedProducts = this.chunkProducts(this.filteredProducts.slice(0, midIndex));
  this.secondGroupedProducts = this.chunkProducts(this.filteredProducts.slice(midIndex));
  }

  groupProducts(products: any[]) {
    const groupSize = 3;
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
    console.log('Evento de favorito:', event.detail.value);
    console.log('Estado inicial del producto:', product);
  
    const selectedValue = event.detail.value;
  
    if (selectedValue === 'like' && !product.updatingFavorite) {
      product.updatingFavorite = true;
      this.addToFavorites(product).add(() => {
        product.updatingFavorite = false; 
      });
    } else if (selectedValue === 'dislike' && !product.updatingFavorite) {
      product.updatingFavorite = true;
      this.removeFromFavorites(product).add(() => {
        product.updatingFavorite = false; 
        
      });
    }
  }

  addToFavorites(product: any) {
    const id_user = JSON.parse(localStorage.getItem('user') || '{}')?.id;
    const id_product = product.product_id;

    return this.favoriteS
      .createFavorite({ id_product, id_user })
      .subscribe(() => {
        product.favorites_count += 1;
        product.isFavorited = true; 
        console.log('Producto agregado a la lista de favoritos del usuario.');
      });
  }

  removeFromFavorites(product: any) {
    const id_product = product.product_id;

    return this.favoriteS.deleteFavorite(id_product).subscribe(() => {
      product.favorites_count -= 1;
      product.isFavorited = false; 
      console.log('Producto eliminado de la lista de favoritos del usuario.');
    });
  }

  openItemDetail(productId: any) {
    console.log('Producto seleccionado:', productId);
      this.modalCtrl.create({
        component: ItemDetailComponent,
        cssClass: 'my-modal',
        componentProps: { productId },
      }).then(modal => modal.present());
    }
}
