import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CameraService, Camera } from 'src/service/camara.service';

/**
 * Componente para mostrar el detalle de una cámara específica en CutsFrame.
 * 
 * Obtiene el identificador de la cámara desde la ruta y muestra su información detallada.
 */
@Component({
  selector: 'app-camara-detalle',
  templateUrl: './camara-detalle.component.html',
  styleUrls: ['./camara-detalle.component.scss']
})
export class CamaraDetalleComponent implements OnInit {
  /** Cámara seleccionada para mostrar su detalle */
  camara?: Camera;

  /**
   * Constructor del componente de detalle de cámara.
   * @param route Servicio para acceder a los parámetros de la ruta activa.
   * @param cameraService Servicio para obtener la información de la cámara.
   */
  constructor(
    private route: ActivatedRoute,
    private cameraService: CameraService
  ) {}

  /**
   * Inicializa el componente, obtiene el ID de la cámara desde la ruta y carga sus datos.
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.camara = this.cameraService.getCamera(id);
  }
}