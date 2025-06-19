import { Component } from '@angular/core';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent {
  userName = 'Administrador'; // Puedes obtenerlo de tu AuthService

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}