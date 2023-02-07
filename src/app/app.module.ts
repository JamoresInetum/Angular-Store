import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { JoelComponent } from './pages/joel/joel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    JoelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ], // Modulos de angular necesarios
  providers: [], //servicios, dependencias
  bootstrap: [AppComponent] // Nombre del módulo principal
})
export class AppModule { }
