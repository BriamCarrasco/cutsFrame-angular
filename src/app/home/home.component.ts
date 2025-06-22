import { Component, OnInit } from '@angular/core';
import { CameraService, Camera } from 'src/service/camara.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';
  cameras: Camera[] = [];

  constructor(
    private cameraService: CameraService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Asegúrate que getCameras() devuelve un array de cámaras
    this.cameras = this.cameraService.getCameras();
  }

  get filteredItems(): Camera[] {
    if (!this.searchTerm.trim()) return [];
    return this.cameras.filter(cam =>
      (cam.marca + ' ' + cam.modelo).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (cam.descripcionCorta?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false) ||
      (cam.categoria?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false)
    );
  }

  goToCamera(cam: Camera) {
    // Ajusta la navegación según tu estructura de rutas
    this.router.navigate(['/camaras', cam.id]);
    this.searchTerm = '';
  }
}