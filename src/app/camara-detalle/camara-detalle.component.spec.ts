import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamaraDetalleComponent } from './camara-detalle.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CamaraDetalleComponent', () => {
  let component: CamaraDetalleComponent;
  let fixture: ComponentFixture<CamaraDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CamaraDetalleComponent],
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(CamaraDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
