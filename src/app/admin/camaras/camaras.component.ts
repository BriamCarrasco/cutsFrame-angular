import { Component, OnInit } from '@angular/core';
import { CameraService, Camera } from 'src/service/camara.service';

declare var bootstrap: any; // Para controlar el modal con Bootstrap JS

/**
 * Componente para la gestión de cámaras en el área de administración de CutsFrame.
 * 
 * Permite listar, crear, editar y eliminar cámaras utilizando almacenamiento local y modales de Bootstrap.
 */
@Component({
  selector: 'app-camaras',
  templateUrl: './camaras.component.html',
  styleUrls: ['./camaras.component.scss']
})
export class CamarasComponent implements OnInit {
  /** Lista de cámaras cargadas desde el servicio */
  camaras: Camera[] = [];
  /** Cámara actualmente en edición o creación */
  camaraEditando: any = {};
  /** Vista previa de la imagen seleccionada */
  imagenPreview: string | ArrayBuffer | null = null;
  /** Texto multilinea para info de la cámara */
  infoCamaraText: string = '';
  /** Texto multilinea para características de la cámara */
  caracteristicasText: string = '';

  /**
   * Constructor del componente de cámaras.
   * @param cameraService Servicio para gestionar cámaras.
   */
  constructor(private cameraService: CameraService) {}

  /**
   * Inicializa el componente y carga la lista de cámaras.
   */
  ngOnInit(): void {
    this.cargarCamaras();
  }

  /**
   * Carga la lista de cámaras desde el servicio.
   */
  cargarCamaras() {
    this.camaras = this.cameraService.getCameras();
  }

  /**
   * Elimina una cámara de la lista y del servicio tras confirmación.
   * @param id Identificador de la cámara a eliminar.
   */
  eliminarCamara(id: string) {
    if (confirm('¿Seguro que deseas eliminar esta cámara?')) {
      this.cameraService.eliminarCamara(id);
      this.cargarCamaras();
    }
  }

  /**
   * Maneja la selección de un archivo de imagen y genera la vista previa.
   * @param event Evento de selección de archivo.
   */
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

  /**
   * Abre el formulario modal para crear una nueva cámara.
   */
  abrirFormularioNuevaCamara() {
    this.camaraEditando = {};
    this.imagenPreview = null;
    this.infoCamaraText = '';
    this.caracteristicasText = '';
    const modal = new (window as any).bootstrap.Modal(document.getElementById('camaraModal'));
    modal.show();
  }

  /**
   * Abre el formulario modal para editar una cámara existente.
   * @param camara Cámara a editar.
   */
  editarCamara(camara: Camera) {
    this.camaraEditando = { ...camara };
    this.imagenPreview = camara.imagen || null;
    this.infoCamaraText = (camara.infoCamara || []).join('\n');
    this.caracteristicasText = (camara.caracteristicas || []).join('\n');
    const modal = new (window as any).bootstrap.Modal(document.getElementById('camaraModal'));
    modal.show();
  }

  /**
   * Guarda los cambios de una cámara (nueva o editada) en el servicio y actualiza la lista.
   * Cierra el modal tras guardar.
   */
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