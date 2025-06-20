import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: User | null = null;
  editandoCampo: string | null = null;
  valorTemporal: string = '';
  mensaje: string = '';
  cambiarPassForm!: FormGroup;
  mensajePass: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

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

  editarCampo(campo: string) {
    this.editandoCampo = campo;
    this.valorTemporal = (this.usuario as any)[campo] || '';
  }

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

  cancelarEdicion() {
    this.editandoCampo = null;
    this.valorTemporal = '';
  }

  mostrarMensaje(msg: string) {
    this.mensaje = msg;
    setTimeout(() => this.mensaje = '', 2000);
  }

  formatearFecha(fecha: Date | string | null | undefined): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const anio = d.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  passwordsIguales(form: FormGroup) {
    const nueva = form.get('passNueva')?.value;
    const confirmar = form.get('passConfirmar')?.value;
    return nueva === confirmar ? null : { noCoincide: true };
  }

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

    // Cierra el modal después de un segundo (si usas Bootstrap 5)
    setTimeout(() => {
      this.mensajePass = '';
      // @ts-ignore
      const modal = window.bootstrap?.Modal.getOrCreateInstance(document.getElementById('modalCambiarPass'));
      if (modal) modal.hide();
    }, 1000);
  }
}