import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CamaraDetalleComponent } from './camara-detalle/camara-detalle.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },      
  { path: 'registro', component: RegistroComponent },
  { path: 'categorias/:categoria', component: CategoriaComponent },
  { path: 'camara/:id', component: CamaraDetalleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
