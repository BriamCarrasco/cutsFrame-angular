import { Injectable } from '@angular/core';
import { CameraService, Camera } from './camara.service';

export interface Categoria {
  id: string;
  nombre: string;
  descripcion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private storageKey = 'categorias';

  constructor(private cameraService: CameraService) {}

  /**
   * Sincroniza las categorías a partir de las cámaras existentes.
   * Si ya existe la categoría, no la duplica.
   */
    sincronizarCategoriasDesdeCamaras() {
    const camaras: Camera[] = this.cameraService.getCameras();
    const categoriasUnicas = Array.from(new Set(camaras.map(cam => cam.categoria)));
    let categorias = this.getCategorias();

    // Agrega las de cámaras si no existen
    categoriasUnicas.forEach(nombre => {
        if (!categorias.some(c => c.nombre === nombre)) {
        categorias.push({
            id: nombre,
            nombre,
            descripcion: ''
        });
        }
    });

    localStorage.setItem(this.storageKey, JSON.stringify(categorias));
    }

  getCategorias(): Categoria[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  agregarCategoria(categoria: Categoria) {
    const categorias = this.getCategorias();
    categorias.push(categoria);
    localStorage.setItem(this.storageKey, JSON.stringify(categorias));
  }

  actualizarCategoria(categoria: Categoria) {
    let categorias = this.getCategorias();
    categorias = categorias.map(c => c.id === categoria.id ? categoria : c);
    localStorage.setItem(this.storageKey, JSON.stringify(categorias));
  }

  eliminarCategoria(id: string) {
    let categorias = this.getCategorias();
    categorias = categorias.filter(c => c.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(categorias));
  }

  getCategoriaPorId(id: string): Categoria | undefined {
    return this.getCategorias().find(c => c.id === id);
  }
}