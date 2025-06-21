import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'getUser', 'logout']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['error', 'success']);
    authServiceSpy.getUser.and.returnValue(of(null));

    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Mostrar error si falla login', () => {
    component.loginForm.setValue({ email: 'test@aa.cl', password: 'Qwerty123!' });
    authServiceSpy.login.and.returnValue(false);

    component.login();

    expect(authServiceSpy.login).toHaveBeenCalledWith('test@aa.cl', 'Qwerty123!');
    expect(toastrSpy.error).toHaveBeenCalledWith('Correo y/o contraseña incorrectos', 'Error');
  });

  it('Mostrar mensaje de exito si el login es correcto', () => {
    component.loginForm.setValue({ email: 'test@aa.cl', password: 'Qwerty123!' });
    authServiceSpy.login.and.returnValue(true);

    component.login();

    expect(authServiceSpy.login).toHaveBeenCalledWith('test@aa.cl', 'Qwerty123!');
    expect(toastrSpy.success).toHaveBeenCalledWith('Inicio de sesión exitoso', 'Éxito');
  });
});