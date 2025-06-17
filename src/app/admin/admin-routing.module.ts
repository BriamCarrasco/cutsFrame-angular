import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CamarasComponent } from './camaras/camaras.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';

const routes: Routes = [
  { path: '', component: PanelAdminComponent },
  { path: 'camaras', component: CamarasComponent },
  { path: 'usuarios', component: UsuariosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
