import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';
import { CamarasComponent } from './camaras/camaras.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Módulo administrativo de CutsFrame.
 * 
 * Declara y organiza los componentes, rutas y dependencias necesarias para el área de administración,
 * incluyendo panel de control, gestión de cámaras, usuarios, categorías y layouts exclusivos para administradores.
 */
@NgModule({
  declarations: [
    PanelAdminComponent,
    CamarasComponent,
    UsuariosComponent,
    CategoriasComponent,
    AdminLayoutComponent,
    FooterAdminComponent,
    NavbarAdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
