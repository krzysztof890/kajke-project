import { UserService } from './../shared/services/user.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../shared/utilities/config.service';
import { map } from 'rxjs/operators';
import { BaseService } from '../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserPanelService extends BaseService {
  private baseUrl: string;

  constructor(private userService: UserService, private http: HttpClient, private configService: ConfigService) {
    super();
    this.baseUrl = configService.getApiURI() + '/AccountManager';
  }

  changePassword(value: { currentPassword: string, newPassword: string }): Observable<boolean> {
    // ustawienie nagłowka, token jest wymaganu do autoryzacji
    const header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.userService.getAuthorizationToken() });
    const body = JSON.stringify(value);

    return this.http.post(this.baseUrl + '/ChangePassword', body,
      { headers: header, observe: 'body', responseType: 'json' })
      .pipe(
        map((res => true)));
  }

  deleteAccount(value: { password: string }): Observable<boolean> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.userService.getAuthorizationToken() });
    const body = JSON.stringify(value);

    return this.http.post(this.baseUrl + '/DeleteUser', body,
      { headers: header, observe: 'body', responseType: 'json' })
      .pipe(
        map((res => true)));
  }

  sendChangeEmailLink(value: { email: string }): Observable<boolean> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.userService.getAuthorizationToken() });
    const body = JSON.stringify(value);

    return this.http.post(this.baseUrl + '/GenerateChangeEmailToken', body,
      { headers: header, observe: 'body', responseType: 'json' })
      .pipe(
        map((res => true)));
  }

  changeEmail(value: { newEmail: string, code: string }): Observable<boolean> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.userService.getAuthorizationToken() });
    const body = JSON.stringify(value);

    return this.http.post(this.baseUrl + '/ReplaceEmail', body,
      { headers: header, observe: 'body', responseType: 'json' })
      .pipe(
        map((res => true)));
  }
}
