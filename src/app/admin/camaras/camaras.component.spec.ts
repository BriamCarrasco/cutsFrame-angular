import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamarasComponent } from './camaras.component';

describe('CamarasComponent', () => {
  let component: CamarasComponent;
  let fixture: ComponentFixture<CamarasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CamarasComponent]
    });
    fixture = TestBed.createComponent(CamarasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
