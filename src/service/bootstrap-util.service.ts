import { Injectable } from '@angular/core';

/**
 * Servicio utilitario para operaciones con componentes Bootstrap desde Angular.
 * 
 * Permite controlar la visibilidad de offcanvas y otros elementos Bootstrap de forma programática.
 */
@Injectable({
  providedIn: 'root'
})
export class BootstrapUtilService {
  /**
   * Cierra un componente offcanvas de Bootstrap por su ID.
   * @param id ID del elemento offcanvas a cerrar.
   */
  cerrarOffcanvas(id: string) {
    const offcanvasElement = document.getElementById(id);
    const bootstrap = (window as any).bootstrap;
    if (offcanvasElement && bootstrap && bootstrap.Offcanvas) {
      const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
      offcanvas.hide();
    }
  }
}