import { Component, OnInit } from '@angular/core';
import { CameraService, Camera } from 'src/service/camara.service';
import { Router } from '@angular/router';

/**
 * Componente principal de la página de inicio de CutsFrame.
 * 
 * Permite buscar cámaras mediante un campo de búsqueda y navegar al detalle de cada cámara.
 * Muestra una lista filtrada de cámaras según el término ingresado por el usuario.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /** Término de búsqueda ingresado por el usuario */
  searchTerm: string = '';
  /** Lista de cámaras disponibles en el sistema */
  cameras: Camera[] = [];

  /**
   * Constructor del componente Home.
   * @param cameraService Servicio para obtener la lista de cámaras.
   * @param router Servicio de enrutamiento de Angular.
   */
  constructor(
    private cameraService: CameraService,
    private router: Router
  ) {}

  /**
   * Inicializa el componente y carga la lista de cámaras.
   */
  ngOnInit(): void {
    // Asegúrate que getCameras() devuelve un array de cámaras
    this.cameras = this.cameraService.getCameras();
    console.log('Cámaras cargadas:', this.cameras);
  }

  /**
   * Devuelve la lista de cámaras filtradas según el término de búsqueda.
   * @returns Un array de cámaras que coinciden con el término de búsqueda.
   */
  get filteredItems(): Camera[] {
    if (!this.searchTerm.trim()) return [];
    return this.cameras.filter(cam =>
      (cam.marca + ' ' + cam.modelo).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (cam.descripcionCorta?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false) ||
      (cam.categoria?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false)
    );
  }

  /**
   * Navega al detalle de la cámara seleccionada.
   * @param cam Cámara seleccionada.
   */
  goToCamera(cam: Camera) {
    this.router.navigate(['/camara', cam.id]);
    this.searchTerm = '';
  }
}