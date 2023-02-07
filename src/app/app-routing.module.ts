import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoelComponent } from './pages/joel/joel.component';

const routes: Routes = [
  // Siempre se ejecutan en orden, tienen prioridades, util por si hay mantenimiento, por ejemplo
  // {path: '**', redirectTo:'mantenimiento', pathMatch: 'full'},
  {path: 'joel', component: JoelComponent},
  { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }