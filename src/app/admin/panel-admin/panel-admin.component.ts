import { Component, OnInit } from '@angular/core';
import { CameraService } from 'src/service/camara.service';
import { CategoriaService } from 'src/service/categoria.service';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.scss']
})
export class PanelAdminComponent implements OnInit {
  totalCamaras = 0;
  totalCategorias = 0;
  totalUsuarios = 0;

  constructor(
    private camaraService: CameraService,
    private categoriaService: CategoriaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Sincroniza categorías desde cámaras antes de contar
    this.categoriaService.sincronizarCategoriasDesdeCamaras();

    this.totalCamaras = this.camaraService.getCameras().length;
    this.totalCategorias = this.categoriaService.getCategorias().length;
    this.totalUsuarios = JSON.parse(localStorage.getItem('usuarios') || '[]').length;
  }
}