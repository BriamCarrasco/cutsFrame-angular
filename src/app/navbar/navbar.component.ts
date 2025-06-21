import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BootstrapUtilService } from 'src/service/bootstrap-util.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loginError: string = '';
  nombreUsuario: string = '';
  isLoggedIn: boolean = false;
  userRole: string | null = null;
  private userSub!: Subscription;
  showPassword: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private bootstrapUtilService: BootstrapUtilService,
  ) {}

  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.userSub = this.authService.getUser().subscribe(user => {
      this.isLoggedIn = !!user;
      this.nombreUsuario = user?.nombre || user?.usuario || '';
      this.userRole = user?.role || null;
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    const success = this.authService.login(email, password);
    if (!success) {
      this.toastr.error('Correo y/o contraseña incorrectos', 'Error');
    } else {
      this.toastr.success('Inicio de sesión exitoso', 'Éxito');
      this.bootstrapUtilService.cerrarOffcanvas('loginOffcanvas');
    }
  }

  logout() {
    this.authService.logout();
    this.toastr.success('Sesión cerrada exitosamente', 'Éxito');
    this.bootstrapUtilService.cerrarOffcanvas('loginOffcanvas');
    this.router.navigate(['/']);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  abrirRegistro() {
    this.bootstrapUtilService.cerrarOffcanvas('loginOffcanvas');
    this.router.navigate(['/registro']);
  }

  abrirRecoverPass() {
    this.bootstrapUtilService.cerrarOffcanvas('loginOffcanvas');
    this.router.navigate(['/recover-pass']);
  }
}