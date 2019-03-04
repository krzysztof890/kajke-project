import { Observable } from 'rxjs/Observable';
import { BaseService } from './base.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../utilities/config.service';
import { map } from 'rxjs/operators';

/**
 * Usługa ktora odpowiada za obsługe systemu logowania i rejestracji uytkownika
 */
@Injectable()
export class UserService extends BaseService {
  private baseUrl = '';

  // komunikuje czy jestesmy zalogowani lub nie przydaje sie do odswierzania zawartosci głownego navbar
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
    // jesli nie ma tokenu uzytkownik nie jest zalogowany
    this.loggedIn = !!localStorage.getItem('auth_token');
    // przekaz czy uzytkownik jest zalogowany
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
  }

  /**
   * Loguje uzytkownika do serwisu. Jeśli operacja sie powiedzie zostanie otzymany tokem JWT.
   * @param email Email uzytkownika
   * @param password Hasło użytkownika
   */
  login(email, password): Observable<boolean> {
    // ustaw naglowek
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<CredentialsResponse>(
        this.baseUrl + '/accounts/login',
        JSON.stringify({ email, password }), { headers: header, observe: 'body', responseType: 'json' }
      ).pipe(
        map((res => {
          // jesli sie udalo zapisac token, ustawic ze zalogowano
          localStorage.setItem('auth_token', res.auth_token);
          localStorage.setItem('user_name', res.user_name);
          this.loggedIn = true;
          this._authNavStatusSource.next(true);
          return true;
        })));
  }

  // rejestracja konta uzytkownika w serwisie
  /**
   * Wysle dane uzytkownika do serwisu w celu utowrzenia nowego konta
   * @param email Email uzytkownika
   * @param password Hasło użytkownika
   */
  register(email, password): Observable<boolean> {
    // ustaw naglowek
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post(
        this.baseUrl + '/accounts/register',
        JSON.stringify({ email, password }), { headers: header, observe: 'body', responseType: 'json' }
      ).pipe(
        map((res => true)));
  }

  // wysyła link potwierdzajacy email do api serwera by obsluzolo to
  /**
   *  Wysyła link potwierdzajacy email do api serwera by obsluzylo go i potwierdzilo adres email
   * @param url Adres Url ktory zawiera wygenerowany token do potwierdzenia adresu email
   */
  confirmEmail(url: string): Observable<boolean> {
    return this.http.get(this.baseUrl + '/accounts' + url).pipe(map((res => true)));
  }

  /**
   * Wysle email uzytkownika do api aby to wygenerowało link to powierdzenia i wyslago go na ten email
   * @param email Email uzytkownika
   */
  sendEmaiConfirmationLink(email: string): Observable<boolean> {
    return this.http.get(this.baseUrl + '/accounts/SendAgainEmailConfirmation?email=' + email).pipe(map((res => true)));
  }

  /**
   * Wysle wskazany email do api aby na niego przyszedl link do zresetowania hasła
   * @param email Email uzytkownika
   */
  forgotPassword(email: string): Observable<boolean> {
    return this.http.get(this.baseUrl + '/accounts/forgotpassword?email=' + email).pipe(map((res => true)));
  }

  /**
   * Wysle wskazane dane do api aby to zresetowalo hasło
   * @param email Email uzytkownika
   * @param password Haslo uzytkownika
   * @param code kod tokena do zresetowania hasła
   */
  resetPassword(email, password, code): Observable<boolean> {
    // ustaw naglowek
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post(
        this.baseUrl + '/accounts/resetpassword',
        JSON.stringify({ email, password, code }), { headers: header, observe: 'body', responseType: 'json' }
      ).pipe(
        map((res => true)));
  }

  /**
   * Wyloguj uzytkownika
   */
  logout(): void {
    // usun token i oznacz ze nie jest zalogowany
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  /**
   * Zwraca czy jakis uzytkownik jest zalogowany
   */
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  /**
   * Zwraca nazwa bierzacego użytkownika
   */
  getUserName(): string {
    return localStorage.getItem('user_name');
  }

  getAuthorizationToken(): string {
    return 'Bearer ' + localStorage.getItem('auth_token');
  }

  /**
   * Sprawdza czy token autoryzcji jest ciagle ważny
   * Jesli nie jest to przeniesie sie aplicka na strone logowania
   */
  IsAuthorized() {
    // ustawienie nagłowka, token jest wymaganu do autoryzacji
    const header = new HttpHeaders({ 'Authorization': this.getAuthorizationToken() });

    return this.http.get(this.baseUrl + '/Survey/IsAuthorized',
      { headers: header, observe: 'body', responseType: 'json' }).pipe(
        map((res => true)));
  }
}

// do mapowania z json odpowiedzi logowania z serwera do zmiany na zas
interface CredentialsResponse {
  auth_token: string;
  user_name: string;
}
