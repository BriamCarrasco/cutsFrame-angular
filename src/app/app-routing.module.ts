import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CamaraDetalleComponent } from './camara-detalle/camara-detalle.component';
import { adminGuard } from './guards/admin.guard';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { CamarasComponent } from './admin/camaras/camaras.component';
import { PanelAdminComponent } from './admin/panel-admin/panel-admin.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';


const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'categorias/:categoria', component: CategoriaComponent },
      { path: 'camara/:id', component: CamaraDetalleComponent },
      // ...otras rutas públicas
    ]
  },
  {
    path: 'panel-admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard], // <-- Aquí aplicas el guard
    children: [
      { path: '', component: PanelAdminComponent },
      { path: 'camaras', component: CamarasComponent },
      { path: 'usuarios', component: UsuariosComponent },
      // ...otras rutas admin
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
