import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';

// Import Bootstrap JS (make sure bootstrap is installed in your project)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Declare bootstrap for TypeScript
declare const bootstrap: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';
  userName: string = '';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.userName = user?.username || '';
      this.isLoggedIn = !!user;
    });
  }

  login() {
    const success = this.authService.login(this.username, this.password);
    if (!success) {
      this.loginError = 'Usuario o contraseña incorrectos';
    } else {
      this.loginError = '';
      const offcanvasEl = document.getElementById('loginOffcanvas');
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl!) || new bootstrap.Offcanvas(offcanvasEl!);
      bsOffcanvas.hide(); // cerrar manualmente
    }
  }
}
