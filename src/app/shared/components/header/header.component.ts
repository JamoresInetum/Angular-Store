import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
  
  <mat-toolbar color="primary">
    <a routerLink="/"><span>My Store </span></a>
    
    <span class="spacer"></span>
    <!-- Al hacer click al módulo del carrito, me lleva a la pagina checkout ! ALERTA ! No tendrá el pointer -->
    <app-cart class="mouseHover" (click)="irAlCheckout()"></app-cart>
  </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // Para usar el router.navigate() necesito inyectar el Router de Angular
  constructor(private router:Router){ }

  irAlCheckout():void {
    this.router.navigate(['/checkout']);
  }
}
