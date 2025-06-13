import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    fechaNacimiento: ['', Validators.required],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[A-Z])(?=.*\\d).+$')
    ]],
    confirmarPassword: ['', Validators.required]
  }, { validators: this.passwordsIguales });

  constructor(private fb: FormBuilder) {}

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
      // Procesar registro
      console.log(this.registroForm.value);
    } else {
      this.registroForm.markAllAsTouched();
    }
  }
}