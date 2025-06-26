import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Interfaz que representa la estructura de un usuario en CutsFrame.
 */
export interface User {
  nombre: string;
  apellido: string;
  usuario: string;
  email: string;
  password: string;
  fechaNacimiento: Date;
  role: string;
}

/**
 * Servicio de autenticación para CutsFrame.
 * 
 * Gestiona el inicio y cierre de sesión, mantiene el usuario autenticado,
 * y provee utilidades para acceder a los datos del usuario actual.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /** Sujeto que mantiene el usuario autenticado actual */
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  /**
   * Inicializa el servicio de autenticación.
   * Recupera el usuario autenticado desde localStorage y crea el usuario admin si no existe.
   * @param router Servicio de enrutamiento de Angular.
   */
  constructor(private router: Router) {
    // Mantener sesión si hay usuario logueado
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }

    // Crear usuario admin si no existe en el array de usuarios
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const existeAdmin = usuarios.some((u: any) => u.usuario === 'admin');
    if (!existeAdmin) {
      usuarios.unshift({
        nombre: 'Administrador',
        apellido: 'Sistema',
        usuario: 'admin',
        email: 'admin@cutsframe.cl',
        password: 'Admincutsframe123',
        role: 'admin'
      });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
  }

  /**
   * Inicia sesión con usuario o email y contraseña.
   * @param usernameOrEmail Usuario o email.
   * @param password Contraseña.
   * @returns true si el inicio de sesión es exitoso, false en caso contrario.
   */
  login(usernameOrEmail: string, password: string): boolean {
    // Busca en usuarios registrados por usuario o email
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const user = usuarios.find((u: any) =>
      (u.usuario === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
    );
    if (user) {
      this.setUser(user); // Guarda el usuario completo
      return true;
    }
    return false;
  }

  /**
   * Cierra la sesión del usuario actual y redirige al home.
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  /**
   * Guarda el usuario autenticado en localStorage y actualiza el sujeto.
   * @param user Usuario autenticado.
   */
  private setUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  /**
   * Devuelve un observable con el usuario autenticado actual.
   * @returns Observable del usuario o null si no hay sesión.
   */
  getUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  /**
   * Obtiene el nombre del usuario autenticado.
   * @returns Nombre del usuario o cadena vacía.
   */
  getUserName(): string {
    return this.currentUserSubject.value?.nombre || '';
  }

  /**
   * Obtiene el apellido del usuario autenticado.
   * @returns Apellido del usuario o cadena vacía.
   */
  getUserApellido(): string {
    return this.currentUserSubject.value?.apellido || '';
  }

  /**
   * Obtiene el email del usuario autenticado.
   * @returns Email del usuario o cadena vacía.
   */
  getUserEmail(): string {
    return this.currentUserSubject.value?.email || '';
  }

  /**
   * Obtiene el nombre de usuario del usuario autenticado.
   * @returns Nombre de usuario o cadena vacía.
   */
  getUserUsuario(): string {
    return this.currentUserSubject.value?.usuario || '';
  }

  /**
   * Obtiene el rol del usuario autenticado.
   * @returns Rol del usuario o cadena vacía.
   */
  getUserRole(): string {
    return this.currentUserSubject.value?.role || '';
  }

  /**
   * Indica si hay un usuario autenticado.
   * @returns true si hay sesión activa, false en caso contrario.
   */
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}