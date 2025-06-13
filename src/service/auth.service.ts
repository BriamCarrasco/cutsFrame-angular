import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string): boolean {
    // ⚠️ Aquí iría la validación real con un backend. Esto es simulado.
    if (username === 'admin' && password === '1234') {
      const user = { username: 'admin', role: 'admin' };
      this.setUser(user);
      return true;
    } else if (username === 'cliente' && password === '1234') {
      const user = { username: 'cliente', role: 'cliente' };
      this.setUser(user);
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private setUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  getCurrentRole(): string | null {
    return this.currentUserSubject.value?.role || null;
  }

  getUserName(): string {
    return this.currentUserSubject.value?.username || 'Invitado';
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}
