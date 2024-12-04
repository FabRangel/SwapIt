import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonModal, IonGrid,IonCard, IonToolbar, IonButtons, IonIcon, IonCol, IonRow, IonButton, IonAvatar, IonText, IonChip, IonLabel, IonTextarea, IonItem, IonInput, IonRadioGroup, IonRadio, ModalController } from "@ionic/angular/standalone";
import { ModalResultComponent } from '../modal-result/modal-result.component';
import { ProductsService } from 'src/app/services/products.service';
import { OffersService } from 'src/app/services/offers.service';
import { FormsModule } from '@angular/forms';
import { create, closeCircleOutline, addCircleOutline } from 'ionicons/icons';
import { StorageService } from 'src/app/services/storage.service';
import { addIcons } from 'ionicons';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-item-offer',
  templateUrl: './item-offer.component.html',
  styleUrls: ['./item-offer.component.scss'],
  standalone: true,
  imports: [ModalResultComponent,IonCard,CommonModule,IonRadio, IonRadioGroup, IonInput, IonItem, IonTextarea, IonLabel, IonChip, IonText, IonAvatar, IonButton, IonRow, IonCol, IonIcon, IonButtons, IonToolbar, IonGrid, IonModal, FormsModule, CommonModule  ],
})
export class ItemOfferComponent  implements OnInit {
  @Input() productId: any | undefined;
  product: any = {};
  productOffered = {
    id_user: 0,
    category: '',
    name: '',
    description: '',
    is_new: false ,
    funcionality: 0,
    image1: null, 
    interest_categories: [],
    status: 'activa',
  };
  acceptedCategories: string[] = [];
  selectedImage: string | null = null;
  id_user = JSON.parse(localStorage.getItem('user') || '{}')?.id;
  image_url: string | null = null;
  productOfferedinBD: any = {};

  constructor(private modalCtrl : ModalController, private productS: ProductsService, private offerS: OffersService, private storageS : StorageService, private notificationsS: NotificationService) {
      addIcons({closeCircleOutline,addCircleOutline}); 
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click(); // Simula el clic en el campo de archivo
    }
  }

  // Maneja el archivo seleccionado
  async onFileSelected(event: any) {
    const file: File = event.target.files[0]; // Obtener el archivo seleccionado

    if (file) {
      const reader = new FileReader();

      // Cuando el archivo esté cargado, lo asignamos a la variable selectedImage
      reader.onload = () => {
        this.selectedImage = reader.result as string; // Almacenamos la URL de la imagen
      };

      // Leemos el archivo como URL en base64
      reader.readAsDataURL(file);
    }

    const files = (event.target as HTMLInputElement).files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = `images/${new Date().getTime()}_${file.name}`;

        try {
          this.image_url = await this.storageS.uploadImage(file, filePath);
          console.log('Imagen cargada en Firebase Storage:', this.image_url);
        } catch (error) {
          console.error('Error al cargar la imagen:', error);
        }
      }
    } else {
      console.warn('Puedes subir hasta 5 imágenes.');
    }
    console.log('Creating image...', this.image_url);
  }

  ngOnInit() {
    this.productS.getProduct(this.productId).subscribe((data: any) => {
      this.product = data;
      console.log('Product:', this.product);
      this.fetchAcceptedCategories();
    });
  }

  rating = 0;  

  setRating(stars: number) {
    this.rating = stars; 
    this.productOffered.funcionality = stars;
  }

  fetchAcceptedCategories() {
    if (this.product.interest_categories) {
      console.log('Interest Categories:', this.product.interest_categories[0]);
      this.acceptedCategories = this.product.interest_categories;
    } else {
      console.warn('Interest categories no están disponibles');
    }
  }

  async openclose(){
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: ModalResultComponent,
    });
    return await modal.present();
  }

  selectedChip: string | null = null; 
  categories: string[] = []; 

  selectChip(category: string) {
    this.selectedChip = category; 
  }

  close(){
    this.modalCtrl.dismiss();
  }
  async openResultModal(resultType: 'success'| 'warning' | 'error') {
    this.modalCtrl.dismiss(); 
  
    const modal = await this.modalCtrl.create({
      component: ModalResultComponent,
      mode: 'ios',
      cssClass: 'my-modal',
      showBackdrop: false,
      componentProps: {
        resultType: resultType,
        title: resultType === 'success' ? 'Oferta exitosa' : 'Error',
        subtitle: resultType === 'success' ? 'Estamos buscando un nuevo hogar para tu producto' :  'Hubo un problema con tu oferta, por favor intenta de nuevo.'
      }
    });
  
    await modal.present(); 
    setTimeout(() => {
      modal.dismiss(); 
    }, 4000);
  }

  async createOffer() {
      console.log('image', this.image_url);
    this.productS.createProduct({id_user: this.id_user, category: this.product.interest_categories[0], 
      name: this.productOffered.name, description: this.productOffered.description, is_new: this.productOffered.is_new, 
      interest_categories: ['ropa','electrónico','hogar','otros'],
      funcionality: this.productOffered.funcionality, image1: this.image_url, status: 'activa'
    }).subscribe(
      (response) => {
        console.log('Producto creado con éxito', response);
        this.productOfferedinBD = response;
        this.offerS.createOffer({id_product: this.productId, id_product_offered: this.productOfferedinBD.id, id_user_offer: this.id_user, status_offer: 'en curso', offer_date: new Date().toISOString() }).subscribe((offerData: any) => {
            console.log('Offer created:', offerData);
            this.openResultModal('success');
            this.notificationsS.createMessage({id_recipient: this.product.id_user, id_user: this.id_user, description: 'Tienes una nueva oferta', message_type: 'ofertas', id_product: this.productId}).subscribe({
              next: (data) => {
                console.log('Notificación creada:', data);
              },
              error: (error) => {
                console.error('Error al crear notificación:', error);
              },
            });
          });
      },
      (error) => {
        console.error('Error al crear producto', error);
      }
    );
    
  }

  
}
