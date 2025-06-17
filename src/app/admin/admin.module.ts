import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';
import { CamarasComponent } from './camaras/camaras.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CategoriasComponent } from './categorias/categorias.component';


@NgModule({
  declarations: [
    PanelAdminComponent,
    CamarasComponent,
    UsuariosComponent,
    CategoriasComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
