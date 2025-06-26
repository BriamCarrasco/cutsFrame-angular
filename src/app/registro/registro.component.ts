import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';

/**
 * Componente encargado del registro de nuevos usuarios en CutsFrame.
 * 
 * Gestiona el formulario de registro, validaciones personalizadas y el almacenamiento de usuarios.
 */
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  /** Controla la visibilidad del campo de contraseña */
  mostrarPassword = false;
  /** Controla la visibilidad del campo de confirmación de contraseña */
  mostrarConfirmPassword = false;

  /**
   * Formulario reactivo para el registro de usuario.
   */
  registroForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    usuario: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    fechaNacimiento: ['', [Validators.required, this.mayorDeTreceAnios]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[.,@!#$%^&*]).+$')
    ]],
    confirmarPassword: ['', Validators.required]
  }, { validators: this.passwordsIguales });

  /**
   * Validador personalizado para verificar si el usuario es mayor de 13 años.
   * @param control Control de formulario con la fecha de nacimiento.
   * @returns Un objeto de error si es menor de 13 años, o null si es válido.
   */
  mayorDeTreceAnios(control: AbstractControl) {
    if (!control.value) return null;
    const fechaNacimiento = new Date(control.value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const m = hoy.getMonth() - fechaNacimiento.getMonth();
    if (edad > 13 || (edad === 13 && m >= 0 && hoy.getDate() >= fechaNacimiento.getDate())) {
      return null;
    }
    return { menorDeTrece: true };
  }

  /**
   * Constructor del componente de registro.
   * @param fb FormBuilder para crear el formulario reactivo.
   * @param toastr Servicio para mostrar notificaciones.
   * @param authService Servicio de autenticación.
   * @param router Servicio de enrutamiento de Angular.
   */
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Validador personalizado para comprobar que las contraseñas coinciden.
   * @param form Formulario reactivo.
   * @returns Null si coinciden, objeto de error si no.
   */
  passwordsIguales(form: any) {
    return form.get('password')?.value === form.get('confirmarPassword')?.value
      ? null : { noCoincide: true };
  }

  /**
   * Alterna la visibilidad del campo de contraseña.
   */
  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  /**
   * Alterna la visibilidad del campo de confirmación de contraseña.
   */
  toggleConfirmPassword() {
    this.mostrarConfirmPassword = !this.mostrarConfirmPassword;
  }

  /**
   * Maneja el envío del formulario de registro.
   * Valida el formulario, almacena el usuario en localStorage y muestra notificaciones.
   */
  onSubmit() {
    if (this.registroForm.valid) {
      const { usuario, password, email, nombre, apellido, fechaNacimiento } = this.registroForm.value;

      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const existe = usuarios.some((u: any) => u.usuario === usuario);
      if (existe) {
        this.toastr.error('El nombre de usuario ya está registrado', 'Error');
        return;
      }

      usuarios.push({
        usuario,
        password,
        email,
        nombre,
        apellido,
        fechaNacimiento: fechaNacimiento ? new Date(fechaNacimiento) : null,
        role: 'cliente'
      });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      this.toastr.success('Registro exitoso', '¡Bienvenido!');
      this.registroForm.reset();

      // Inicia sesión automáticamente
      this.authService.login(email ?? '', password ?? '');

      // Redirige al home
      this.router.navigate(['/home']);
    } else {
      this.registroForm.markAllAsTouched();
      this.toastr.error('Completa correctamente el formulario', 'Error');
    }
  }
}