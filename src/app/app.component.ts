import { Component } from '@angular/core';

/**
 * Componente raíz de la aplicación CutsFrame.
 * 
 * Este componente es el punto de entrada de la aplicación y contiene la estructura principal.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * Título de la aplicación.
   */
  title = 'frontend';
}
