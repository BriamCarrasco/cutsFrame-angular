import { Component, OnInit } from '@angular/core';
import { Categoria, CategoriaService } from 'src/service/categoria.service';

declare var bootstrap: any;

/**
 * Componente para la gestión de categorías en el área de administración de CutsFrame.
 * 
 * Permite listar, crear, editar y eliminar categorías utilizando almacenamiento local y modales de Bootstrap.
 */
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  /** Lista de categorías cargadas desde el servicio */
  categorias: Categoria[] = [];
  /** Categoría actualmente en edición o creación */
  categoriaEditando: Categoria = { id: '', nombre: '', descripcion: '' };

  /**
   * Constructor del componente de categorías.
   * @param categoriaService Servicio para gestionar categorías.
   */
  constructor(private categoriaService: CategoriaService) {}

  /**
   * Inicializa el componente, sincroniza las categorías y las carga desde el servicio.
   */
  ngOnInit(): void {
    this.categoriaService.sincronizarCategoriasDesdeCamaras();
    this.cargarCategorias();
  }

  /**
   * Carga la lista de categorías desde el servicio.
   */
  cargarCategorias() {
    this.categorias = this.categoriaService.getCategorias();
  }

  /**
   * Abre el formulario modal para crear una nueva categoría.
   */
  abrirFormularioNuevaCategoria() {
    this.categoriaEditando = { id: '', nombre: '', descripcion: '' };
    const modal = new bootstrap.Modal(document.getElementById('categoriaModal'));
    modal.show();
  }

  /**
   * Abre el formulario modal para editar una categoría existente.
   * @param categoria Categoría a editar.
   */
  editarCategoria(categoria: Categoria) {
    this.categoriaEditando = { ...categoria };
    const modal = new bootstrap.Modal(document.getElementById('categoriaModal'));
    modal.show();
  }

  /**
   * Guarda los cambios de una categoría (nueva o editada) en el servicio y actualiza la lista.
   * Cierra el modal tras guardar.
   */
  guardarCategoria() {
    if (this.categoriaEditando.id) {
      this.categoriaService.actualizarCategoria(this.categoriaEditando);
    } else {
      this.categoriaEditando.id = Date.now().toString();
      this.categoriaService.agregarCategoria(this.categoriaEditando);
    }
    this.cargarCategorias();
    bootstrap.Modal.getInstance(document.getElementById('categoriaModal')).hide();
  }

  /**
   * Elimina una categoría de la lista y del servicio tras confirmación.
   * @param categoria Categoría a eliminar.
   */
  eliminarCategoria(categoria: Categoria) {
    if (confirm('¿Seguro que deseas eliminar esta categoría?')) {
      this.categoriaService.eliminarCategoria(categoria.id);
      this.cargarCategorias();
    }
  }
}