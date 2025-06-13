import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  username: string = '';
  password: string = '';
  loginError: string = '';
  userName: string = '';
  isLoggedIn: boolean = false;
  userRole: string | null = null;
  private userSub!: Subscription;
  showPassword: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.getUser().subscribe(user => {
      this.isLoggedIn = !!user;
      this.userName = user?.username || '';
      this.userRole = user?.role || null;
    });
  }

  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
  }

  login() {
    const success = this.authService.login(this.username, this.password);
    if (!success) {
      this.loginError = 'Usuario o contraseña incorrectos';
    } else {
      this.loginError = '';
      // Cierra el offcanvas si es necesario
    }
  }

  logout() {
    this.authService.logout();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}