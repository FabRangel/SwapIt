import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonGrid, IonRow, IonCol, IonIcon, IonButton, IonList, IonItem, IonInput } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { mail, key, eye, person, logoFacebook, logoGithub, logoGoogle } from 'ionicons/icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonInput, IonItem, IonList, IonButton, IonIcon, IonCol, IonRow, IonGrid, IonText, RouterLink,
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SignupPage implements OnInit {

  constructor() {
    addIcons({person,mail,key,logoFacebook,logoGithub,logoGoogle,eye});
   }

  ngOnInit() {
  }

}
