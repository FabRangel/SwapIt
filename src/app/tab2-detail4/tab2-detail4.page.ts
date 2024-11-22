import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NavController,
} from '@ionic/angular/standalone';
import { IonicModule, ModalController } from '@ionic/angular';
import { checkmarkCircleOutline, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ModalResultComponent } from '../components/modal-result/modal-result.component';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { ProductsService } from '../services/products.service';
import { ModalAskingComponent } from '../components/modal-asking/modal-asking.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab2-detail4',
  templateUrl: './tab2-detail4.page.html',
  styleUrls: ['./tab2-detail4.page.scss'],
  standalone: true,
  imports: [ModalResultComponent, IonicModule, FormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab2Detail4Page implements OnInit {
  @Input() name!: string;
  @Input() category!: string;
  @Input() description!: string;
  @Input() funcionality!: number;
  @Input() is_new!: boolean;
  @Input() interest_categories!: string[];
  images: string[] = [];
  maxImages = 5;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private storageS: StorageService,
    private productS: ProductsService,
    private authS: AuthService,
  ) {
    addIcons({ chevronForwardOutline, chevronBackOutline, checkmarkCircleOutline });
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  submitForm() {
    if (this.name.trim() === '') {
      console.log('El título no puede estar vacío.');
      return;
    }

    console.log('Título de la publicación:', this.name);
    this.modalCtrl.dismiss({
      title: this.name,
      images: this.images, // Enviamos las URLs de las imágenes al cerrar el modal
    });
  }

  async openAcept() {
    const productImages = {
      image1: this.images[0] || null,
      image2: this.images[1] || null,
      image3: this.images[2] || null,
      image4: this.images[3] || null,
      image5: this.images[4] || null,
    };
    
    const modal = await this.modalCtrl.create({
      component: ModalAskingComponent,
      cssClass: 'my-modal',
      componentProps: {
        title: '¿Estás seguro de publicar tu oferta?',
        subtitle:
          'Revise que toda la información sea correcta antes de publicar.',
      },
    });
  
    await modal.present();
    const { data } = await modal.onDidDismiss();
    const user = JSON.parse(this.authS.getUser() || '{}')
    const userId = user?.id;
    console.log(userId);
    if (data.confirmed) {
      console.log('Publicando producto');
      this.productS
        .createProduct({
          name: this.name,
          category: this.category,
          description: this.description, 
          funcionality: this.funcionality,
          is_new: this.is_new,
          interest_categories: this.interest_categories.join(','),
          ...productImages,
          id_user: userId,
        })
        .subscribe({
          next: async (response: any) => {
            console.log('Producto creado exitosamente:', response);
  
            setTimeout(async () => {
              const resultModal = await this.modalCtrl.create({
                component: ModalResultComponent,
                cssClass: 'my-modal',
                componentProps: {
                  title:
                    response.name
                      ? '¡Publicación exitosa!'
                      : '¡Error al publicar!',
                  subtitle:
                    response.name
                      ? 'Tu oferta ha sido publicada exitosamente.'
                      : 'Hubo un error al publicar tu oferta. Por favor, intenta de nuevo.',
                },
              });
              await resultModal.present();
              
              const { data } = await resultModal.onDidDismiss();
              console.log('Datos del modal de resultado:', data);
              if (data.confirmed) {
                await this.modalCtrl.dismiss();
                this.navCtrl
                  .navigateRoot('/tabs/tab1')
                  .then(() => {
                    console.log('Redirigido a Tab1');
                  })
                  .catch((err) => {
                    console.error('Error en la navegación:', err);
                  });
              }
            }); 
          },
          error: async (error) => {
          console.error('Error al crear el producto:', error);
          // Mostrar un modal de error
          const errorModal = await this.modalCtrl.create({
            component: ModalResultComponent,
            cssClass: 'my-modal',
            componentProps: {
              resultType: 'error',
              title: '¡Error al publicar!',
              subtitle:
                'Hubo un problema al intentar publicar tu oferta. Por favor, verifica tu conexión e inténtalo de nuevo.',
            },
          });
          await errorModal.present();
          const { data } = await errorModal.onDidDismiss();
          console.log('Datos del modal de error:', data);

          // Opcional: manejar el flujo según la respuesta del modal
          if (data?.confirmed) {
            console.log('El usuario desea intentar nuevamente.');
          }
          },
        });
    }
  }

  async onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && this.images.length + files.length <= this.maxImages) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = `images/${new Date().getTime()}_${file.name}`;

        try {
          const imageUrl = await this.storageS.uploadImage(file, filePath);
          this.images.push(imageUrl);
          console.log('Imagen cargada en Firebase Storage:', imageUrl);
        } catch (error) {
          console.error('Error al cargar la imagen:', error);
        }
      }
    } else {
      console.warn('Puedes subir hasta 5 imágenes.');
    }
  }

  ngOnInit() {
    console.log(
      'Datos recibidos:',
      this.category,
      this.name,
      this.description,
      this.funcionality,
      this.is_new,
      this.interest_categories,
      this.images
    );
  }
}
