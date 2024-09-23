import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'inicio',  
    loadComponent: () => import('./pages/inicio/inicio.page').then(m => m.InicioPage)
  },
  {
    path: '',  
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'tabs', 
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/resetpass/resetpass.page').then( m => m.ResetpassPage)
  }
];