import { Component, OnInit } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  usuarioEditando: any = {};

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  }

  abrirFormularioNuevoUsuario() {
    this.usuarioEditando = {};
    const modal = new bootstrap.Modal(document.getElementById('usuarioModal'));
    modal.show();
  }

  editarUsuario(usuario: any) {
    this.usuarioEditando = { ...usuario };
    const modal = new bootstrap.Modal(document.getElementById('usuarioModal'));
    modal.show();
  }

  guardarUsuario() {
    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (this.usuarioEditando.id) {
      // Editar usuario existente
      usuarios = usuarios.map((u: any) =>
        u.id === this.usuarioEditando.id ? this.usuarioEditando : u
      );
    } else {
      // Agregar nuevo usuario
      this.usuarioEditando.id = Date.now().toString();
      usuarios.push(this.usuarioEditando);
    }
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    this.cargarUsuarios();
    bootstrap.Modal.getInstance(document.getElementById('usuarioModal')).hide();
  }

  eliminarUsuario(usuario: any) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      usuarios = usuarios.filter((u: any) => u.id !== usuario.id);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      this.cargarUsuarios();
    }
  }
}