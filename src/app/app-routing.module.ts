import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Siempre se ejecutan en orden, tienen prioridades, util por si hay mantenimiento, por ejemplo
  // {path: '**', redirectTo:'mantenimiento', pathMatch: 'full'},

  { path: '', redirectTo: '/products', pathMatch: 'full'},
  { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
