import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  username: string = '';
  password: string = '';
  loginError: string = '';
  userName: string = '';
  isLoggedIn: boolean = false;
  userRole: string | null = null;
  private userSub!: Subscription;
  showPassword: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.getUser().subscribe(user => {
      this.isLoggedIn = !!user;
      this.userName = user?.username || '';
      this.userRole = user?.role || null;
    });
  }

  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
  }

  login() {
    const success = this.authService.login(this.username, this.password);
    if (!success) {
      this.toastr.error(this.loginError, 'Correo y/o contraseña incorrectos');
      
    } else {
      this.toastr.success('Inicio de sesión exitoso', 'Éxito');
      const offcanvasElement = document.getElementById('loginOffcanvas');
      // @ts-ignore
      const bootstrap = (window as any).bootstrap;
      if (offcanvasElement && bootstrap && bootstrap.Offcanvas) {
        const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
        offcanvas.hide();
      }
    }
  }

  logout() {
    this.authService.logout();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }


abrirRegistro() {
  // Cierra el offcanvas usando el objeto global de Bootstrap
  const offcanvasElement = document.getElementById('loginOffcanvas');
  // @ts-ignore
  const bootstrap = (window as any).bootstrap;
  if (offcanvasElement && bootstrap && bootstrap.Offcanvas) {
    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
    offcanvas.hide();
  }
  // Navega a la página de registro
  this.router.navigate(['/registro']);
}

}