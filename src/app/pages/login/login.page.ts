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
  IonList,
  IonItem,
  IonInput,
  IonIcon,
  IonButton,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  eye,
  key,
  lockClosed,
  mail,
  logoFacebook,
  logoGithub,
  logoGoogle,
  eyeOff,
} from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModalResultComponent } from 'src/app/components/modal-result/modal-result.component';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    RouterLink,
    IonText,
    IonButton,
    IonIcon,
    IonInput,
    IonItem,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authS: AuthService,
    private route: Router,
    private modalCtrl: ModalController
  ) {
    addIcons({
      mail,
      key,
      eye,
      eyeOff,
      logoFacebook,
      logoGithub,
      logoGoogle,
      lockClosed,
    });

    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {}

login() {
  this.authS.login(this.loginForm.value).pipe(
    catchError((error) => {
      if (error) {
        this.modalCtrl
          .create({
            component: ModalResultComponent,
            mode: 'ios',
            cssClass: 'my-modal',
            showBackdrop: false,
            componentProps: {
              resultType: 'error',
              title: 'Error',
              subtitle:
                'Hubo un problema al iniciar sesión, por favor revise sus credenciales e intente de nuevo.',
            },
          })
          .then((modal) => {
            modal.present();
          });
      }
      return throwError(error);  
    })
  ).subscribe(
    (response: any) => {
      console.log('Respuesta exitosa:', response);
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.admin));
      if (response.access_token) {
        this.route.navigateByUrl('tabs/tab1');
      }
    },
    (err) => {
      console.log('Error global:', err);
    }
  );
}
}
