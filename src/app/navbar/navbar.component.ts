import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';



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
    // @ts-ignore
    const bsOffcanvas = window.bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl!);
    bsOffcanvas.hide(); // cerrar manualmente
  }
}

}
