import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonIcon, IonButton, IonText, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eye, key, lockClosed, mail, logoFacebook, logoGithub, logoGoogle, eyeOff } from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, RouterLink,
    IonText, IonButton, IonIcon, IonInput, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  loginForm! : FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private authS : AuthService, private route : Router) {
    addIcons({mail,key,eye,eyeOff,logoFacebook,logoGithub,logoGoogle,lockClosed});
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', Validators.required]
    });

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
  }

  login(){
   this.authS.login(this.loginForm.value).subscribe((response:any)=>{
      console.log(response);
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.admin));
      if(response.access_token){
        this.route.navigateByUrl('tabs/tab1');
      }
    })
  }

}
