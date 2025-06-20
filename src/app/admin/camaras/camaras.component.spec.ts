import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CamarasComponent } from './camaras.component';

describe('CamarasComponent', () => {
  let component: CamarasComponent;
  let fixture: ComponentFixture<CamarasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CamarasComponent],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(CamarasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
