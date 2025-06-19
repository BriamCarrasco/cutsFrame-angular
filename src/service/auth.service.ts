import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  nombre: string;
  apellido: string;
  usuario: string;
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

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

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  private setUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  getUserName(): string {
    return this.currentUserSubject.value?.nombre || '';
  }

  getUserApellido(): string {
    return this.currentUserSubject.value?.apellido || '';
  }

  getUserEmail(): string {
    return this.currentUserSubject.value?.email || '';
  }

  getUserUsuario(): string {
    return this.currentUserSubject.value?.usuario || '';
  }

  getUserRole(): string {
    return this.currentUserSubject.value?.role || '';
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}