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
    path: '', 
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
  },
  {
    path: 'tab4',
    loadComponent: () => import('./tab4/tab4.page').then( m => m.Tab4Page)
  },
  {
    path: 'tab5',
    loadComponent: () => import('./tab5/tab5.page').then( m => m.Tab5Page)
  },
];