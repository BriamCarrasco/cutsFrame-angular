import { Component, OnInit } from '@angular/core';
import { Categoria, CategoriaService } from 'src/app/service/categoria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var bootstrap: any;

/**
 * Componente para administrar las categorías.
 * Permite listar, agregar, editar y eliminar categorías usando localStorage.
 */
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  /** Formulario reactivo para la gestión de categorías */
  categoriaForm!: FormGroup;
  /** Lista de categorías mostradas en la tabla */
  categorias: Categoria[] = [];
  /** Categoría en edición o creación */
  categoriaEditando: Categoria = { id: 0, nombre: '', descripcion: '' };

  /**
   * Constructor. Inyecta el servicio de categorías.
   * @param categoriaService Servicio para obtener las categorías desde el JSON remoto
   */
  constructor(private categoriaService: CategoriaService, private fb: FormBuilder) {}

  /**
   * Inicializa el componente y carga las categorías desde localStorage o JSON remoto.
   */
  ngOnInit(): void {
    // Inicializa localStorage con el JSON remoto solo la primera vez
    const locales = JSON.parse(localStorage.getItem('categoria') || '[]');
    if (locales.length === 0) {
      this.categoriaService.getCategorias().subscribe(data => {
        const categoriasMapeadas = data.map((c: any) => ({
          id: c.id_categoria,
          nombre: c.nom_categoria,
          descripcion: c.desc_categoria
        }));
        localStorage.setItem('categoria', JSON.stringify(categoriasMapeadas));
        this.categorias = categoriasMapeadas;
      });
    } else {
      this.categorias = locales;
    }

    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  /**
   * Abre el formulario modal para agregar una nueva categoría.
   */
  abrirFormularioNuevaCategoria() {
    this.categoriaForm.reset();
    this.categoriaEditando = { id: 0, nombre: '', descripcion: '' };
    const modal = new bootstrap.Modal(document.getElementById('categoriaModal'));
    modal.show();
  }

  /**
   * Abre el formulario modal para editar una categoría existente.
   * @param categoria Categoría a editar
   */
  editarCategoria(categoria: Categoria) {
    this.categoriaEditando = { ...categoria };
    this.categoriaForm.patchValue({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    });
    const modal = new bootstrap.Modal(document.getElementById('categoriaModal'));
    modal.show();
  }

  /**
   * Guarda una nueva categoría o actualiza una existente.
   * Actualiza el array y localStorage.
   */
  guardarCategoria(): void {
    if (this.categoriaForm.invalid){
      this.categoriaForm.markAllAsTouched();
      return;
    }
    const valoresForm = this.categoriaForm.value;

    if (this.categoriaEditando.id) {
      // Editar
      const index = this.categorias.findIndex(c => c.id === this.categoriaEditando.id);
      if (index !== -1) {
        this.categorias[index] = { ...this.categoriaEditando, ...valoresForm };
      }
    } else {
      // Crear
      const nuevoId = this.categorias.length > 0
        ? Math.max(...this.categorias.map(c => c.id)) + 1
        : 1;
      this.categorias.push({ ...valoresForm, id: nuevoId });
    }
    localStorage.setItem('categoria', JSON.stringify(this.categorias));
    this.categoriaEditando = { id: 0, nombre: '', descripcion: '' };
    bootstrap.Modal.getInstance(document.getElementById('categoriaModal')).hide();
  }

  /**
   * Elimina una categoría del array y de localStorage.
   * @param categoria Categoría a eliminar
   */
  eliminarCategoria(categoria: Categoria) {
    if (confirm('¿Seguro que deseas eliminar esta categoría?')) {
      this.categorias = this.categorias.filter(c => c.id !== categoria.id);
      localStorage.setItem('categoria', JSON.stringify(this.categorias));
      this.categoriaEditando = { id: 0, nombre: '', descripcion: '' };
    }
  }
}