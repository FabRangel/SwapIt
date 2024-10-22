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
  {
    path: 'tab2-detail',
    loadComponent: () => import('./tab2-detail/tab2-detail.page').then( m => m.Tab2DetailPage)
  },  {
    path: 'tab2-detail1',
    loadComponent: () => import('./tab2-detail1/tab2-detail1.page').then( m => m.Tab2Detail1Page)
  },
  {
    path: 'tab2-detail2',
    loadComponent: () => import('./tab2-detail2/tab2-detail2.page').then( m => m.Tab2Detail2Page)
  },
  {
    path: 'tab2-detail3',
    loadComponent: () => import('./tab2-detail3/tab2-detail3.page').then( m => m.Tab2Detail3Page)
  },
  {
    path: 'tab2-detail4',
    loadComponent: () => import('./tab2-detail4/tab2-detail4.page').then( m => m.Tab2Detail4Page)
  },
  {
    path: 'acept',
    loadComponent: () => import('./acept/acept.page').then( m => m.AceptPage)
  },



];