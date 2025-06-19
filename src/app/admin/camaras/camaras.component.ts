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



  eliminarCamara(id: string) {
    if (confirm('¿Seguro que deseas eliminar esta cámara?')) {
      this.cameraService.eliminarCamara(id);
      this.cargarCamaras();
    }
  }

  imagenPreview: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagenPreview = reader.result;
        this.camaraEditando.imagen = reader.result as string; // Guarda base64 en el modelo
      };
      reader.readAsDataURL(file);
    }
  }


  infoCamaraText: string = '';
  caracteristicasText: string = '';

  abrirFormularioNuevaCamara() {
    this.camaraEditando = {};
    this.imagenPreview = null;
    this.infoCamaraText = '';
    this.caracteristicasText = '';
    const modal = new (window as any).bootstrap.Modal(document.getElementById('camaraModal'));
    modal.show();
  }

  editarCamara(camara: Camera) {
    this.camaraEditando = { ...camara };
    this.imagenPreview = camara.imagen || null;
    this.infoCamaraText = (camara.infoCamara || []).join('\n');
    this.caracteristicasText = (camara.caracteristicas || []).join('\n');
    const modal = new (window as any).bootstrap.Modal(document.getElementById('camaraModal'));
    modal.show();
  }

  guardarCamara() {
    this.camaraEditando.infoCamara = this.infoCamaraText.split('\n').filter(line => line.trim() !== '');
    this.camaraEditando.caracteristicas = this.caracteristicasText.split('\n').filter(line => line.trim() !== '');
    if (this.camaraEditando.id) {
      this.cameraService.actualizarCamara(this.camaraEditando);
    } else {
      this.cameraService.agregarCamara(this.camaraEditando);
    }
    this.cargarCamaras();
    (window as any).bootstrap.Modal.getInstance(document.getElementById('camaraModal')).hide();
  }


}