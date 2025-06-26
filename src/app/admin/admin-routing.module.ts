import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CamarasComponent } from './camaras/camaras.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';
import { CategoriasComponent } from './categorias/categorias.component';

/**
 * Definición de las rutas del área de administración de CutsFrame.
 * 
 * Este módulo configura la navegación interna del panel de administración,
 * permitiendo el acceso a la gestión de cámaras, usuarios, categorías y al panel principal.
 */
const routes: Routes = [
  /** Ruta principal del panel de administración */
  { path: '', component: PanelAdminComponent },
  /** Ruta para la gestión de cámaras */
  { path: 'camaras', component: CamarasComponent },
  /** Ruta para la gestión de usuarios */
  { path: 'usuarios', component: UsuariosComponent },
  /** Ruta para la gestión de categorías */
  { path: 'categorias', component: CategoriasComponent},
];

/**
 * Módulo de enrutamiento para el área de administración.
 * 
 * Importa y exporta las rutas configuradas para su uso en el módulo administrativo.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }