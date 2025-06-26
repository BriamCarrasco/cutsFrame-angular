import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { RegistroComponent } from './registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriaComponent } from './categoria/categoria.component';
import { CamaraDetalleComponent } from './camara-detalle/camara-detalle.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { RecoverPassComponent } from './recover-pass/recover-pass.component';


/**
 * Módulo principal de la aplicación CutsFrame.
 * 
 * Declara y configura los componentes, módulos y servicios globales utilizados en la aplicación.
 * Este módulo es el punto de entrada de la aplicación Angular.
 */

@NgModule({
  /**
   * Declaración de todos los componentes utilizados en la aplicación.
   */
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    RegistroComponent,
    CategoriaComponent,
    CamaraDetalleComponent,
    PublicLayoutComponent,
    PerfilUsuarioComponent,
    RecoverPassComponent,
    
  ],
  /**
   * Importación de módulos necesarios para el funcionamiento global de la aplicación.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  /**
   * Proveedores de servicios globales (vacío en este caso).
   */
  providers: [],
  /**
   * Componente raíz que se inicializa al arrancar la aplicación.
   */
  bootstrap: [AppComponent]
})
export class AppModule { }
