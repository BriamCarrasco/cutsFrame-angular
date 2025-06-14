import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamaraDetalleComponent } from './camara-detalle.component';

describe('CamaraDetalleComponent', () => {
  let component: CamaraDetalleComponent;
  let fixture: ComponentFixture<CamaraDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CamaraDetalleComponent]
    });
    fixture = TestBed.createComponent(CamaraDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
