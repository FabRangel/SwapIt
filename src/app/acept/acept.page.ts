import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonItem, IonIcon, IonChip, IonFab, IonFabButton, IonGrid } from '@ionic/angular/standalone';
import { IonicModule, ModalController } from '@ionic/angular';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-acept',
  templateUrl: './acept.page.html',
  styleUrls: ['./acept.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class AceptPage implements OnInit {
  title: string = '';

  constructor(private modalCtrl: ModalController) {
    addIcons({chevronForwardOutline,chevronBackOutline});
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

  ngOnInit() {
  }

}
