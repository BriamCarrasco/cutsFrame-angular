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
import { CategoriasComponent } from './admin/categorias/categorias.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { RecoverPassComponent } from './recover-pass/recover-pass.component';


const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'categorias/:categoria', component: CategoriaComponent },
      { path: 'camara/:id', component: CamaraDetalleComponent },
      { path: 'perfil-usuario', component: PerfilUsuarioComponent },
      { path: 'recover-pass', component: RecoverPassComponent }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
