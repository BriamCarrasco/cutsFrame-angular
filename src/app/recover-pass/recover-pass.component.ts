import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Componente encargado de la recuperación de contraseña en CutsFrame.
 * 
 * Permite al usuario solicitar instrucciones para restablecer su contraseña mediante correo electrónico.
 */
@Component({
  selector: 'app-recover-pass',
  templateUrl: './recover-pass.component.html',
  styleUrls: ['./recover-pass.component.scss']
})
export class RecoverPassComponent {
  /** Formulario reactivo para ingresar el correo electrónico */
  recoverForm: FormGroup;
  /** Mensaje informativo mostrado al usuario tras enviar el formulario */
  mensaje: string = '';

  /**
   * Constructor del componente de recuperación de contraseña.
   * @param fb FormBuilder para crear el formulario reactivo.
   */
  constructor(private fb: FormBuilder) {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * Maneja el envío del formulario de recuperación.
   * Si el formulario es válido, muestra un mensaje informativo.
   */
  onSubmit() {
    if (this.recoverForm.invalid) {
      this.recoverForm.markAllAsTouched();
      return;
    }
    this.mensaje = 'Si el correo existe, recibirás instrucciones para recuperar tu contraseña.';
    this.recoverForm.reset();
  }

  /**
   * Abre el offcanvas de login utilizando Bootstrap JS.
   * Permite al usuario volver a la pantalla de inicio de sesión.
   */
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