import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',  // Define primero la ruta para login
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: '',  // Redirecciona a login si la ruta está vacía
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',  // Carga las tabs solo después del login
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  }
];