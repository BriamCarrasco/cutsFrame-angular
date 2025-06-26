import { Injectable } from '@angular/core';
import { CameraService, Camera } from './camara.service';

/**
 * Interfaz que representa la estructura de una categoría en CutsFrame.
 */
export interface Categoria {
  id: string;
  nombre: string;
  descripcion?: string;
}

/**
 * Servicio para la gestión de categorías en CutsFrame.
 * 
 * Permite sincronizar, obtener, agregar, actualizar y eliminar categorías.
 * Utiliza localStorage para persistencia y se apoya en CameraService para la sincronización.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  /** Clave de almacenamiento en localStorage para las categorías */
  private storageKey = 'categorias';

  /**
   * Constructor del servicio de categorías.
   * @param cameraService Servicio de cámaras para sincronización de categorías.
   */
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

  /**
   * Obtiene la lista de categorías almacenadas.
   * @returns Un array de categorías.
   */
  getCategorias(): Categoria[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  /**
   * Agrega una nueva categoría al almacenamiento.
   * @param categoria Categoría a agregar.
   */
  agregarCategoria(categoria: Categoria) {
    const categorias = this.getCategorias();
    categorias.push(categoria);
    localStorage.setItem(this.storageKey, JSON.stringify(categorias));
  }

  /**
   * Actualiza una categoría existente.
   * @param categoria Categoría con los datos actualizados.
   */
  actualizarCategoria(categoria: Categoria) {
    let categorias = this.getCategorias();
    categorias = categorias.map(c => c.id === categoria.id ? categoria : c);
    localStorage.setItem(this.storageKey, JSON.stringify(categorias));
  }

  /**
   * Elimina una categoría por su identificador.
   * @param id Identificador de la categoría a eliminar.
   */
  eliminarCategoria(id: string) {
    let categorias = this.getCategorias();
    categorias = categorias.filter(c => c.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(categorias));
  }

  /**
   * Obtiene una categoría por su identificador.
   * @param id Identificador de la categoría.
   * @returns La categoría encontrada o undefined si no existe.
   */
  getCategoriaPorId(id: string): Categoria | undefined {
    return this.getCategorias().find(c => c.id === id);
  }
}