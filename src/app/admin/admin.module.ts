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


@NgModule({
  declarations: [
    PanelAdminComponent,
    CamarasComponent,
    UsuariosComponent,
    CategoriasComponent,
    AdminLayoutComponent,
    FooterAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class AdminModule { }
