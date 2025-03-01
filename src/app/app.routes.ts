import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { authGuard } from './core/services/guards/auth.guard';
import { logedGuard } from './core/services/guards/loged.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./Component/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./Component/register/register.component').then(m => m.RegisterComponent) },
      { path: 'froget-password', loadComponent: () => import('./Component/froget-password/froget-password.component').then(m => m.FrogetPasswordComponent) }
    ]
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./Component/home/home.component').then(m => m.HomeComponent) },
      { path: 'cart', loadComponent: () => import('./Component/cart/cart.component').then(m => m.CartComponent) },
      { path: 'products', loadComponent: () => import('./Component/product/product.component').then(m => m.ProductComponent) },
      { path: 'categories', loadComponent: () => import('./Component/categories/categories.component').then(m => m.CategoriesComponent) },
      { path: 'brands', loadComponent: () => import('./Component/brands/brands.component').then(m => m.BrandsComponent) },
      { path: 'SignOut', loadComponent: () => import('./Component/sign-out/sign-out.component').then(m => m.SignOutComponent) },
      { path: 'detailsProduct/:id', loadComponent: () => import('./Component/details-product/details-product.component').then(m => m.DetailsProductComponent) },
      { path: 'allorders', loadComponent: () => import('./Component/all-orders/all-orders.component').then(m => m.AllOrdersComponent) },
      { path: 'orders/:id', loadComponent: () => import('./Component/orders/orders.component').then(m => m.OrdersComponent) }
    ]
  },
  { path: '**', loadComponent: () => import('./Component/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
