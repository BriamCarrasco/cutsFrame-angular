import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
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
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.userSub = this.authService.getUser().subscribe(user => {
      this.isLoggedIn = !!user;
      this.userName = user?.usuario || '';
      this.userRole = user?.role || null;
    });
  }

login() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }
  const { username, password } = this.loginForm.value;
  const success = this.authService.login(username, password);
  if (!success) {
    this.toastr.error('Correo y/o contraseña incorrectos', 'Error');
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