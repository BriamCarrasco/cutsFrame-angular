import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CamaraDetalleComponent } from './camara-detalle/camara-detalle.component';
import { adminGuard } from './guards/admin.guard';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { RecoverPassComponent } from './recover-pass/recover-pass.component';


/**
 * Definición de las rutas principales de la aplicación CutsFrame.
 * 
 * Este módulo configura la navegación entre las diferentes vistas públicas y de administración,
 * incluyendo protección de rutas mediante guards y carga perezosa de módulos administrativos.
 */
const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      /** Ruta principal de inicio */
      { path: '', component: HomeComponent },
      /** Ruta para registro de usuarios */
      { path: 'registro', component: RegistroComponent },
      /** Ruta para mostrar cámaras por categoría */
      { path: 'categorias/:categoria', component: CategoriaComponent },
      /** Ruta para el detalle de una cámara específica */
      { path: 'camara/:id', component: CamaraDetalleComponent },
      /** Ruta para el perfil del usuario */
      { path: 'perfil-usuario', component: PerfilUsuarioComponent },
      /** Ruta para recuperación de contraseña */
      { path: 'recover-pass', component: RecoverPassComponent }
    ]
  },
  {
    /** Rutas protegidas para administración, con carga perezosa y guard */
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

/**
 * Módulo de enrutamiento principal de la aplicación.
 * 
 * Importa y exporta las rutas configuradas para su uso en toda la aplicación.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
