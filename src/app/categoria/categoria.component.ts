import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CameraService, Camera } from 'src/service/camara.service';

/**
 * Componente para mostrar cámaras filtradas por categoría en CutsFrame.
 * 
 * Obtiene la categoría desde la ruta y muestra la lista de cámaras correspondientes.
 */
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  /** Lista de cámaras filtradas por la categoría seleccionada */
  camaras: Camera[] = [];
  /** Categoría actual obtenida desde la ruta */
  categoriaActual = '';

  /**
   * Constructor del componente de categoría.
   * @param cameraService Servicio para obtener cámaras filtradas por categoría.
   * @param route Servicio para acceder a los parámetros de la ruta activa.
   */
  constructor(
    private cameraService: CameraService,
    private route: ActivatedRoute
  ) {}

  /**
   * Inicializa el componente, obtiene la categoría de la ruta y carga las cámaras correspondientes.
   */
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoriaActual = params.get('categoria') || '';
      // Asegúrate de que la categoría coincida con la de tu servicio (mayúsculas/minúsculas)
      this.camaras = this.cameraService.getCamerasByCategory(this.categoriaActual);
    });
  }
}