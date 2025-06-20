import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  mostrarPassword = false;
  mostrarConfirmPassword = false;

  registroForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    usuario: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    fechaNacimiento: ['', [Validators.required, this.mayorDeTreceAnios]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[.,@!#$%^&*]).+$')
    ]],
    confirmarPassword: ['', Validators.required]
  }, { validators: this.passwordsIguales });

  mayorDeTreceAnios(control: any) {
    if (!control.value) return null;
    const fechaNacimiento = new Date(control.value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const m = hoy.getMonth() - fechaNacimiento.getMonth();
    if (edad > 13 || (edad === 13 && m >= 0 && hoy.getDate() >= fechaNacimiento.getDate())) {
      return null;
    }
    return { menorDeTrece: true };
  }

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  passwordsIguales(form: any) {
    return form.get('password')?.value === form.get('confirmarPassword')?.value
      ? null : { noCoincide: true };
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  toggleConfirmPassword() {
    this.mostrarConfirmPassword = !this.mostrarConfirmPassword;
  }

onSubmit() {
  if (this.registroForm.valid) {
    const usuario = this.registroForm.value.usuario ?? '';
    const password = this.registroForm.value.password ?? '';
    const email = this.registroForm.value.email ?? '';

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const existe = usuarios.some((u: any) => u.usuario === usuario);
    if (existe) {
      this.toastr.error('El nombre de usuario ya está registrado', 'Error');
      return;
    }

    usuarios.push({ usuario, password, email });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    this.toastr.success('Registro exitoso', '¡Bienvenido!');
    this.registroForm.reset();

    // Inicia sesión automáticamente
    this.authService.login(usuario, password);

    // Redirige al home
    this.router.navigate(['/home']);
  } else {
    this.registroForm.markAllAsTouched();
    this.toastr.error('Completa correctamente el formulario', 'Error');
  }
}
}