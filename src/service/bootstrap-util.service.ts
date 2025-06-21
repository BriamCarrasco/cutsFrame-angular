import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BootstrapUtilService {
  cerrarOffcanvas(id: string) {
    const offcanvasElement = document.getElementById(id);
    const bootstrap = (window as any).bootstrap;
    if (offcanvasElement && bootstrap && bootstrap.Offcanvas) {
      const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
      offcanvas.hide();
    }
  }
}