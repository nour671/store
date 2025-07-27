import { Routes } from '@angular/router';
// import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
        title: 'Home'
      },
      {path:'cart',loadComponent:()=>import("./pages/cart/cart.component").then((c)=>c.CartComponent) ,title:'cart'},
      {path:'products',loadComponent:()=>import("./pages/products/products.component").then((c)=>c.ProductsComponent) ,title:'products'},
      {path:'details/:id',loadComponent:()=>import("./pages//details/details.component").then((c)=>c.DetailsComponent) ,title:'details' },
      {path: 'login',loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent),title: 'Login'},

    ]
  },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
       {
        path: 'manage',
        canActivate: [adminGuard],
        loadComponent: () => import('./pages/manage/manage.component').then(c => c.ManageComponent),
        title: 'Manage'
      },


    ]
  },

  {
    path: '**',
    component: NotfoundComponent
  }
];
