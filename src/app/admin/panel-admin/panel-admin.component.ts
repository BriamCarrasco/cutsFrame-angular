import { Component, OnInit } from '@angular/core';
import { CameraService } from 'src/service/camara.service';
import { CategoriaService } from 'src/service/categoria.service';
import { AuthService } from 'src/service/auth.service';
import { UsuariosService } from 'src/app/service/usuarios.service';

/**
 * Componente del panel principal de administración para CutsFrame.
 * 
 * Muestra estadísticas generales como el total de cámaras, categorías y usuarios registrados.
 * Sincroniza las categorías antes de mostrar los datos.
 */
@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.scss']
})
export class PanelAdminComponent implements OnInit {
  /** Total de cámaras registradas */
  totalCamaras = 0;
  /** Total de categorías registradas */
  totalCategorias = 0;
  /** Total de usuarios registrados */
  totalUsuarios = 0;

  /**
   * Constructor del componente PanelAdmin.
   * @param camaraService Servicio para gestionar cámaras.
   * @param categoriaService Servicio para gestionar categorías.
   * @param authService Servicio de autenticación.
   */
  constructor(
    private camaraService: CameraService,
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private usuariosService: UsuariosService,
  ) {}

  /**
   * Inicializa el componente, sincroniza categorías y obtiene los totales de cámaras, categorías y usuarios.
   */
  ngOnInit(): void {
    // Sincroniza categorías desde cámaras antes de contar
    this.categoriaService.sincronizarCategoriasDesdeCamaras();

    this.totalCamaras = this.camaraService.getCameras().length;
    this.totalCategorias = this.categoriaService.getCategorias().length;

    this.usuariosService.getUsuarios().subscribe(usuarios => {this.totalUsuarios = usuarios.length;});
  }
}