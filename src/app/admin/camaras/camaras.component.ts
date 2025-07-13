import { Component, OnInit } from '@angular/core';
import { CameraService, Camera } from 'src/service/camara.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  camarasForm!: FormGroup;
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
  constructor(private cameraService: CameraService, private fb: FormBuilder) {}

  /**
   * Inicializa el componente y carga la lista de cámaras.
   */
  ngOnInit(): void {
    this.cargarCamaras();
    this.camarasForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      tipoCamara: ['', Validators.required],
      fechaLanzamiento: ['', Validators.required],
      descripcionCorta: ['', Validators.required],
      descripcionCompleta: ['', Validators.required],
      tipoSensor: ['', Validators.required],
      tamanoSensor: ['', Validators.required],
      velocidadObturacion: ['', Validators.required],
      resolucion: ['', Validators.required],
      puntosEnfoque: ['', Validators.required],
      velocidadRafaga: ['', Validators.required],
      video: ['', Validators.required],
      pantalla: ['', Validators.required],
      formatoArchivo: ['', Validators.required],
      flash: ['', Validators.required],
      materialConstruccion: [''],
      ISO: ['', Validators.required],
      montura: ['', Validators.required],
      tipoVisor: ['', Validators.required],
      peso: ['', Validators.required],
      categoria: ['', Validators.required],
      imagen: ['', Validators.required],
      infoCamara: ['', Validators.required],
      caracteristicas: ['', Validators.required]
    });    
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
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result;
        this.camarasForm.get('imagen')?.setValue(this.imagenPreview);
      };
      reader.readAsDataURL(file);
    } else {
      this.imagenPreview = null;
      this.camarasForm.get('imagen')?.setValue('');
    }
  }

  /**
   * Abre el formulario modal para crear una nueva cámara.
   */
  abrirFormularioNuevaCamara() {
    this.camaraEditando = {};
    this.camarasForm.reset();
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
    if (this.camarasForm.invalid) {
      this.camarasForm.markAllAsTouched();
      return;
    }
    const valoresForm = this.camarasForm.value;
    if (this.camaraEditando.id) {
      const index = this.camaras.findIndex(c => c.id === this.camaraEditando.id);
      if (index !== -1) {
        this.camaras[index] = { ...this.camaraEditando, ...valoresForm };
      }
    } else {
      valoresForm.id = Date.now().toString();
      this.camaras.push(valoresForm);
    }
    localStorage.setItem('camaras', JSON.stringify(this.camaras));
    bootstrap.Modal.getInstance(document.getElementById('camaraModal')).hide();
  }
}