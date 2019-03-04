import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './shared/services/user.service';

/**
 * Służy do weryfikacji czy użytkownik ma uprawnienia do dadej sekcji aplikacji
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) { }

  /**
   * Werefikuje czy użytkownik jest zalogowany
   */
  canActivate() {
    // sprawdza czy uzytkownik jest zalogowany jesli nie przeniesie do ekranu logowania
    if (!this.user.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
