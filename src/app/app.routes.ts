import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/todos/todos.component'),
    pathMatch: 'full',
  },
  {
    path: 'cantidad',
    loadComponent: () => import('./components/counter-todos/counter-todos.component'),
    pathMatch: 'full',
  },

  {
    path: '*',
    redirectTo: '',
    pathMatch: 'full',
  }

];
