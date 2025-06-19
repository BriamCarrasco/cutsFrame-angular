import { Component, OnInit } from '@angular/core';
import { CameraService, Camera } from 'src/service/camara.service';

declare var bootstrap: any; // Para controlar el modal con Bootstrap JS

@Component({
  selector: 'app-camaras',
  templateUrl: './camaras.component.html',
  styleUrls: ['./camaras.component.scss']
})
export class CamarasComponent implements OnInit {
  camaras: Camera[] = [];
  camaraEditando: any = {};

  constructor(private cameraService: CameraService) {}

  ngOnInit(): void {
    this.cargarCamaras();
  }

  cargarCamaras() {
    this.camaras = this.cameraService.getCameras();
  }

  abrirFormularioNuevaCamara() {
    this.camaraEditando = {};
    const modal = new bootstrap.Modal(document.getElementById('camaraModal'));
    modal.show();
  }

  editarCamara(camara: Camera) {
    this.camaraEditando = { ...camara };
    const modal = new bootstrap.Modal(document.getElementById('camaraModal'));
    modal.show();
  }

  guardarCamara() {
    if (this.camaraEditando.id) {
      this.cameraService.actualizarCamara(this.camaraEditando);
    } else {
      this.cameraService.agregarCamara(this.camaraEditando);
    }
    this.cargarCamaras();
    bootstrap.Modal.getInstance(document.getElementById('camaraModal')).hide();
  }

  eliminarCamara(id: string) {
    if (confirm('¿Seguro que deseas eliminar esta cámara?')) {
      this.cameraService.eliminarCamara(id);
      this.cargarCamaras();
    }
  }
}