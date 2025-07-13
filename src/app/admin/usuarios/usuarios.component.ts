import { Component, OnInit } from '@angular/core';

declare var bootstrap: any;

/**
 * Componente para la gestión de usuarios en el área de administración de CutsFrame.
 * 
 * Permite listar, crear, editar y eliminar usuarios utilizando almacenamiento local y modales de Bootstrap.
 */
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  /** Lista de usuarios cargados desde localStorage */
  usuarios: any[] = [];
  /** Usuario actualmente en edición o creación */
  usuarioEditando: any = {};

  /**
   * Inicializa el componente y carga la lista de usuarios.
   */
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  /**
   * Carga la lista de usuarios desde localStorage.
   */
  cargarUsuarios() {
    this.usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  }

  /**
   * Abre el formulario modal para crear un nuevo usuario.
   */
  abrirFormularioNuevoUsuario() {
    this.usuarioEditando = {};
    const modal = new bootstrap.Modal(document.getElementById('usuarioModal'));
    modal.show();
  }

  /**
   * Abre el formulario modal para editar un usuario existente.
   * @param usuario Usuario a editar.
   */
  editarUsuario(usuario: any) {
    this.usuarioEditando = { ...usuario };
    const modal = new bootstrap.Modal(document.getElementById('usuarioModal'));
    modal.show();
  }

  /**
   * Guarda los cambios de un usuario (nuevo o editado) en localStorage y actualiza la lista.
   * Cierra el modal tras guardar.
   */
  guardarUsuario() {
    this.usuarioEditando.role = 'admin';
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

  /**
   * Elimina un usuario de la lista y del localStorage tras confirmación.
   * @param usuario Usuario a eliminar.
   */
  eliminarUsuario(usuario: any) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      usuarios = usuarios.filter((u: any) => u.id !== usuario.id);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      this.cargarUsuarios();
    }
  }
}