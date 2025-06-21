import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './registro.component';
import {ToastrModule} from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroComponent],
      imports: [FormsModule, ToastrModule.forRoot(),ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Mostrar error si las password no coinciden', () => {
  component.registroForm.patchValue({
    password: 'Qwerty123!',
    confirmarPassword: 'Qwerty123.'
  });
    expect(component.registroForm.hasError('noCoincide')).toBeTrue();
  });

  it('Mostrar error si el usuario ya existe.', () => {
    spyOn(component['toastr'], 'error');
    localStorage.setItem('usuarios', JSON.stringify([{ usuario: 'usuarioTest' }]));
    component.registroForm.patchValue({
      usuario: 'usuarioTest',
      password: 'Qwerty123!',
      confirmarPassword: 'Qwerty123!',
      email: 'test@aa.cl',
      nombre: 'Test',
      apellido: 'User',
      fechaNacimiento: '2000-01-01'
    });
    component.onSubmit();
    expect(component['toastr'].error).toHaveBeenCalledWith('El nombre de usuario ya está registrado', 'Error');
  });
  
});
