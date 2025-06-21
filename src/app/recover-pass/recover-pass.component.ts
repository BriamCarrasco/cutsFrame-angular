import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover-pass',
  templateUrl: './recover-pass.component.html',
  styleUrls: ['./recover-pass.component.scss']
})
export class RecoverPassComponent {
  recoverForm: FormGroup;
  mensaje: string = '';

  constructor(private fb: FormBuilder) {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.recoverForm.invalid) {
      this.recoverForm.markAllAsTouched();
      return;
    }
    this.mensaje = 'Si el correo existe, recibirás instrucciones para recuperar tu contraseña.';
    this.recoverForm.reset();
  }

  abrirLogin() {
    const loginOffcanvas = document.getElementById('loginOffcanvas');
    if (loginOffcanvas) {
      const bootstrap = (window as any).bootstrap;
      if (bootstrap && bootstrap.Offcanvas) {
        const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(loginOffcanvas);
        offcanvas.show();
      }
    }
  }

}