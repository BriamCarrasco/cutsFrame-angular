import { Component } from '@angular/core';
import { AuthService } from 'src/service/auth.service';

/**
 * Componente de barra de navegación para el área de administración de CutsFrame.
 * 
 * Muestra el nombre del usuario administrador y permite cerrar sesión.
 */
@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent {
  /** Nombre del usuario administrador mostrado en la barra */
  userName = 'Administrador'; // Puedes obtenerlo de tu AuthService

  /**
   * Constructor del componente navbar de administración.
   * @param authService Servicio de autenticación.
   */
  constructor(private authService: AuthService) {}

  /**
   * Cierra la sesión del usuario administrador.
   */
  logout() {
    this.authService.logout();
  }
}