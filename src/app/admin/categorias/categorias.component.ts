import { Component, OnInit } from '@angular/core';
import { Categoria, CategoriaService } from 'src/service/categoria.service';

declare var bootstrap: any;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriaEditando: Categoria = { id: '', nombre: '', descripcion: '' };

  constructor(private categoriaService: CategoriaService) {}

ngOnInit(): void {
  this.categoriaService.sincronizarCategoriasDesdeCamaras();
  this.cargarCategorias();
}

  cargarCategorias() {
    this.categorias = this.categoriaService.getCategorias();
  }

  abrirFormularioNuevaCategoria() {
    this.categoriaEditando = { id: '', nombre: '', descripcion: '' };
    const modal = new bootstrap.Modal(document.getElementById('categoriaModal'));
    modal.show();
  }

  editarCategoria(categoria: Categoria) {
    this.categoriaEditando = { ...categoria };
    const modal = new bootstrap.Modal(document.getElementById('categoriaModal'));
    modal.show();
  }

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

  eliminarCategoria(categoria: Categoria) {
    if (confirm('¿Seguro que deseas eliminar esta categoría?')) {
      this.categoriaService.eliminarCategoria(categoria.id);
      this.cargarCategorias();
    }
  }
}