import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BootstrapUtilService } from 'src/service/bootstrap-util.service';

/**
 * Componente de barra de navegación (navbar) para CutsFrame.
 * 
 * Gestiona la autenticación de usuarios, navegación, formularios de login y acceso a paneles de usuario.
 * Incluye integración con Bootstrap Offcanvas y notificaciones visuales.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  /** Formulario reactivo para login de usuario */
  loginForm!: FormGroup;
  /** Mensaje de error mostrado en el login */
  loginError: string = '';
  /** Nombre del usuario autenticado */
  nombreUsuario: string = '';
  /** Indica si hay un usuario autenticado */
  isLoggedIn: boolean = false;
  /** Rol del usuario autenticado */
  userRole: string | null = null;
  /** Suscripción al observable de usuario */
  private userSub!: Subscription;
  /** Controla la visibilidad del campo de contraseña */
  showPassword: boolean = false;

  /**
   * Constructor del componente navbar.
   * @param authService Servicio de autenticación.
   * @param router Servicio de enrutamiento de Angular.
   * @param toastr Servicio para mostrar notificaciones.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param bootstrapUtilService Utilidad para controlar componentes Bootstrap.
   */
  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private bootstrapUtilService: BootstrapUtilService,
  ) {}

  /**
   * Cancela la suscripción al observable de usuario al destruir el componente.
   */
  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
  }

  /**
   * Inicializa el formulario de login y suscribe al usuario autenticado.
   */
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

  /**
   * Maneja el proceso de inicio de sesión.
   * Valida el formulario, muestra notificaciones y cierra el offcanvas si es exitoso.
   */
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

  /**
   * Cierra la sesión del usuario y muestra una notificación.
   * También cierra el offcanvas y redirige al home.
   */
  logout() {
    this.authService.logout();
    this.toastr.success('Sesión cerrada exitosamente', 'Éxito');
    this.bootstrapUtilService.cerrarOffcanvas('loginOffcanvas');
    this.router.navigate(['/']);
  }

  /**
   * Alterna la visibilidad del campo de contraseña en el formulario de login.
   */
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  /**
   * Abre la pantalla de registro y cierra el offcanvas de login.
   */
  abrirRegistro() {
    this.bootstrapUtilService.cerrarOffcanvas('loginOffcanvas');
    this.router.navigate(['/registro']);
  }

  /**
   * Abre la pantalla de recuperación de contraseña y cierra el offcanvas de login.
   */
  abrirRecoverPass() {
    this.bootstrapUtilService.cerrarOffcanvas('loginOffcanvas');
    this.router.navigate(['/recover-pass']);
  }
}