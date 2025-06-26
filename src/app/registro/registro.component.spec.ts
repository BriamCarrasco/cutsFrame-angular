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


  it('Test para registro exitoso', () => {
  // Limpia usuarios previos
  localStorage.setItem('usuarios', JSON.stringify([]));
  // Espía los métodos de toastr y router
  spyOn(component['toastr'], 'success');
  spyOn(component['router'], 'navigate');
  spyOn(component['authService'], 'login').and.returnValue(true);

  component.registroForm.patchValue({
    usuario: 'UsuarioTest',
    password: 'Qwerty123!',
    confirmarPassword: 'Qwerty123!',
    email: 'test@aa.cl',
    nombre: 'Test',
    apellido: 'Registro',
    fechaNacimiento: '2000-01-01'
  });

  component.onSubmit();

  // Verifica que el usuario fue agregado a localStorage
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  expect(usuarios.some((u: any) => u.usuario === 'UsuarioTest')).toBeTrue();

  // Verifica que se llamó a toastr.success
  expect(component['toastr'].success).toHaveBeenCalledWith('Registro exitoso', '¡Bienvenido!');

  // Verifica que se llamó a login
  expect(component['authService'].login).toHaveBeenCalledWith('test@aa.cl', 'Qwerty123!');

  // Verifica que se redirigió al home
  expect(component['router'].navigate).toHaveBeenCalledWith(['/home']);
  });
  
});
