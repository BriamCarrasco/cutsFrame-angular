import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CameraService, Camera } from 'src/service/camara.service';

@Component({
  selector: 'app-camara-detalle',
  templateUrl: './camara-detalle.component.html',
  styleUrls: ['./camara-detalle.component.scss']
})
export class CamaraDetalleComponent implements OnInit {
  camara?: Camera;

  constructor(
    private route: ActivatedRoute,
    private cameraService: CameraService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.camara = this.cameraService.getCamera(id);
  }
}