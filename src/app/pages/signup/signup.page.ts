import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonList,
  IonItem,
  IonInput,
  ModalController,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  mail,
  key,
  eye,
  person,
  logoFacebook,
  logoGithub,
  logoGoogle,
} from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';
import { ModalResultComponent } from 'src/app/components/modal-result/modal-result.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonItem,
    IonList,
    IonButton,
    IonIcon,
    IonCol,
    IonRow,
    IonGrid,
    IonText,
    RouterLink,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SignupPage implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authS: AuthService,
    private modalCtrl: ModalController,
    private router: Router
  ) {
    addIcons({ person, mail, key, logoFacebook, logoGithub, logoGoogle, eye });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register() {
    this.authS.register(this.registerForm.value).subscribe(
      (response: any) => {
        this.modalCtrl
          .create({
            component: ModalResultComponent,
            mode: 'ios',
            cssClass: 'my-modal',
            showBackdrop: false,
            componentProps: {
              title: 'Usuario registrado exitosamente',
              subtitle: 'Ingrese sesión',
            },
          })
          .then((modal) => {
            modal.present();
            setTimeout(() => {
              modal.dismiss().then(() => {
                this.router.navigate(['/login']); 
              });
            }, 3000); 
          });
      },
      (error: any) => {
        this.modalCtrl
          .create({
            component: ModalResultComponent,
            mode: 'ios',
            cssClass: 'my-modal',
            showBackdrop: false,
            componentProps: {
              title: 'Error al registrar',
              subtitle:
                error.error.message || 'Ocurrió un problema. Intenta de nuevo.',
            },
          })
          .then((modal) => {
            modal.present();
            setTimeout(() => {
              modal.dismiss().then(() => {
                this.router.navigate(['/login']); 
              });
            }, 3000); 
      })
      },    
  );
  }

  ngOnInit() {}
}
