import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/service/auth.service';

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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.usuario = user;
    });
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
}