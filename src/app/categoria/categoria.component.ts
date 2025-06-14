import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CameraService, Camera } from 'src/service/camara.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  camaras: Camera[] = [];
  categoriaActual = '';

  constructor(
    private cameraService: CameraService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoriaActual = params.get('categoria') || '';
      // Asegúrate de que la categoría coincida con la de tu servicio (mayúsculas/minúsculas)
      this.camaras = this.cameraService.getCamerasByCategory(this.categoriaActual);
    });
  }
}