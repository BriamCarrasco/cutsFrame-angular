import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Componente para la gestión y edición del perfil de usuario en CutsFrame.
 * 
 * Permite visualizar y editar los datos personales del usuario, así como cambiar la contraseña.
 */
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {
  /** Usuario actualmente autenticado */
  usuario: User | null = null;
  /** Campo que se está editando actualmente */
  editandoCampo: string | null = null;
  /** Valor temporal para la edición de un campo */
  valorTemporal: string = '';
  /** Mensaje informativo para el usuario */
  mensaje: string = '';
  /** Formulario reactivo para el cambio de contraseña */
  cambiarPassForm!: FormGroup;
  /** Mensaje relacionado con el cambio de contraseña */
  mensajePass: string = '';

  /**
   * Constructor del componente de perfil de usuario.
   * @param authService Servicio de autenticación para obtener y actualizar el usuario.
   * @param fb FormBuilder para crear formularios reactivos.
   */
  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  /**
   * Inicializa el componente, obtiene el usuario actual y configura el formulario de cambio de contraseña.
   */
  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.usuario = user;
    });

    this.cambiarPassForm = this.fb.group({
      passActual: ['', Validators.required],
      passNueva: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[.,@!#$%^&*]).+$')
      ]],
      passConfirmar: ['', Validators.required]
    }, { validators: this.passwordsIguales });
  }

  /**
   * Activa el modo edición para un campo específico del perfil.
   * @param campo Nombre del campo a editar.
   */
  editarCampo(campo: string) {
    this.editandoCampo = campo;
    this.valorTemporal = (this.usuario as any)[campo] || '';
  }

  /**
   * Guarda los cambios realizados en el campo editado y actualiza el usuario en localStorage y en sesión.
   */
  guardarEdicion() {
    if (!this.usuario || !this.editandoCampo) return;

    // Actualiza el campo en el usuario actual
    (this.usuario as any)[this.editandoCampo] = this.valorTemporal;

    // Actualiza el usuario en el array de usuarios
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const idx = usuarios.findIndex((u: any) => u.email === this.usuario?.email);
    if (idx !== -1) {
      usuarios[idx][this.editandoCampo] = this.valorTemporal;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    // Actualiza el usuario en sesión
    localStorage.setItem('currentUser', JSON.stringify(this.usuario));
    this.authService['currentUserSubject'].next(this.usuario);

    this.mostrarMensaje('¡Dato actualizado correctamente!');
    this.editandoCampo = null;
    this.valorTemporal = '';
  }

  /**
   * Cancela la edición de un campo y restaura el valor temporal.
   */
  cancelarEdicion() {
    this.editandoCampo = null;
    this.valorTemporal = '';
  }

  /**
   * Muestra un mensaje informativo durante 2 segundos.
   * @param msg Mensaje a mostrar.
   */
  mostrarMensaje(msg: string) {
    this.mensaje = msg;
    setTimeout(() => this.mensaje = '', 2000);
  }

  /**
   * Formatea una fecha a formato DD/MM/AAAA.
   * @param fecha Fecha a formatear.
   * @returns Fecha formateada como string.
   */
  formatearFecha(fecha: Date | string | null | undefined): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const anio = d.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  /**
   * Validador personalizado para comprobar que las contraseñas nuevas coinciden.
   * @param form Formulario reactivo.
   * @returns Null si coinciden, objeto de error si no.
   */
  passwordsIguales(form: FormGroup) {
    const nueva = form.get('passNueva')?.value;
    const confirmar = form.get('passConfirmar')?.value;
    return nueva === confirmar ? null : { noCoincide: true };
  }

  /**
   * Maneja el proceso de cambio de contraseña del usuario.
   * Valida el formulario, actualiza la contraseña y muestra mensajes informativos.
   * Cierra el modal de cambio de contraseña tras la actualización.
   */
  onCambiarPass() {
    if (!this.usuario) return;
    if (this.cambiarPassForm.invalid) {
      this.cambiarPassForm.markAllAsTouched();
      return;
    }
    const { passActual, passNueva } = this.cambiarPassForm.value;
    if (passActual !== this.usuario.password) {
      this.mensajePass = 'La contraseña actual es incorrecta.';
      return;
    }
    // Actualiza la contraseña en el usuario actual
    this.usuario.password = passNueva;

    // Actualiza en el array de usuarios
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const idx = usuarios.findIndex((u: any) => u.email === this.usuario?.email);
    if (idx !== -1) {
      usuarios[idx].password = passNueva;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    // Actualiza en sesión
    localStorage.setItem('currentUser', JSON.stringify(this.usuario));
    this.authService['currentUserSubject'].next(this.usuario);

    this.mensajePass = '¡Contraseña actualizada!';
    this.cambiarPassForm.reset();

    // Cierra el modal después de un segundo 
    setTimeout(() => {
      this.mensajePass = '';
      // @ts-ignore
      const modal = window.bootstrap?.Modal.getOrCreateInstance(document.getElementById('modalCambiarPass'));
      if (modal) modal.hide();
    }, 1000);
  }
}