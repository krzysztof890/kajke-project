import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { finalize } from 'rxjs/operators';
import { BaseService } from './base.service';
import { ConfigService } from '../utilities/config.service';
import { UserService } from './user.service';
import { Survey } from '../Models/survey';
import { SurveyResults } from '../Models/survey-results';

/**
 * Usługa ktora dostarcza mozliwosc komunikacji dla komponentow ankiety z api
 */
@Injectable()
export class SurveyService extends BaseService {
  private baseUrl = '';

  private isRequestingSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
   * Observable ktory ma komunikowac czy jest się w trakcie żadania to api ankiety
   */
  public isRequestingObservable: Observable<boolean> = this.isRequestingSource.asObservable();
  // do monitorowania tego czy zmienila sie strukyitra ankiety
  // zmiana tresci pytania lib odpowiedzi nie wpływa na to
  private surveyWasEditedSource: Subject<void> = new Subject();
  public surveyWasEditedObservable = this.surveyWasEditedSource.asObservable();

  constructor(private configService: ConfigService, private userService: UserService, private http: HttpClient) {
    super();
    this.baseUrl = configService.getApiURI() + '/Survey';
  }

  /**
   * Utworz ankiete w serwisie
   * @param body Model ankiety w formacie json
   */
  createSurvey(body: string): Observable<boolean> {
    // ustawienie nagłowka, token jest wymaganu do autoryzacji
    const header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.userService.getAuthorizationToken() });

    this.isRequestingSource.next(true);

    return this.http.post(this.baseUrl + '/CreateSurvey', body,
      { headers: header, observe: 'body', responseType: 'json' })
      .pipe(
        finalize(() => this.isRequestingSource.next(false)),
        map((res => true)));
  }

  /**
   * Pobiera ankiety uzytkownika z api
   */
  getUserSurveys(): Observable<Array<{ name: string, link: string }>> {
    // ustawienie nagłowka, token jest wymaganu do autoryzacji
    const header = new HttpHeaders({ 'Authorization': this.userService.getAuthorizationToken() });
    this.isRequestingSource.next(true);

    return this.http.get(this.baseUrl + '/GetUserSurveys', { headers: header, responseType: 'json' })
      .pipe(finalize(() => this.isRequestingSource.next(false)),
        map(res => res as Array<{ name: string, link: string }>));
  }

  /**
   * Usuwa ankiete uzytkownika z serwisu
   * @param link wygenerowany identyfikator ankiety do odsyłacza
   */
  remoweSurvey(link: string): Observable<boolean> {
    const header = new HttpHeaders({ 'Link': link, 'Authorization': this.userService.getAuthorizationToken() });
    this.isRequestingSource.next(true);

    return this.http.delete(this.baseUrl + '/DeleteSurvey', { headers: header, observe: 'body', responseType: 'json' })
      .pipe(finalize(() => this.isRequestingSource.next(false)),
        map(res => true));
  }

  /**
   * Pobierz wybrana ankiete
   * @param link identyfikator ankiety
   */
  getSurvey(link: string): Observable<Survey> {
    const header = new HttpHeaders({ 'Authorization': this.userService.getAuthorizationToken() });
    this.isRequestingSource.next(true);

    return this.http.get(this.baseUrl + '/GetSurvey?link=' + link,
      { headers: header, responseType: 'json' }).pipe(finalize(() => this.isRequestingSource.next(false)),
        map(res => Object.setPrototypeOf(res, new Survey)
        ));
  }

  /**
   * Edytuj ankiete w serwisie
   * @param body Model ankiety w formacie json
   */
  editSurvey(link: string, body: string, structureWasChanged: boolean) {
    // ustawienie nagłowka, token jest wymaganu do autoryzacji

    const header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': this.userService.getAuthorizationToken(),
      'link': link, 'structureWasChanged': JSON.stringify(structureWasChanged)
    });

    this.isRequestingSource.next(true);

    return this.http.post(this.baseUrl + '/EditSurvey', body,
      { headers: header, observe: 'body', responseType: 'json' })
      .pipe(
        finalize(() => this.isRequestingSource.next(false)),
        map((res => true)));
  }

  /**
   * Wyślij zaproszenia email do ankiety
   * @param emails Lista adresow email
   * @param link  Indentyfikator ankiety
   */
  sendEmailsInvites(emails: string[], link: string) {
    // ustawienie nagłowka, token jest wymaganu do autoryzacji
    const header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': this.userService.getAuthorizationToken(),
      'link': link
    });
    const body = JSON.stringify({ Emails: emails });

    // this.isRequestingSource.next(true);
    return this.http.post(this.baseUrl + '/SendEmailsInvites', body,
      { headers: header, observe: 'body', responseType: 'json' })
      .pipe(
        // finalize(() => this.isRequestingSource.next(false)),
        map((res => true)));
  }

  /**
   * Pobierz wyniki ankiety
   * @param link identyfakator ankiety
   */
  getSurveyResults(link: string): Observable<SurveyResults> {
    const header = new HttpHeaders({ 'Authorization': this.userService.getAuthorizationToken() });
    this.isRequestingSource.next(true);

    return this.http.get(this.baseUrl + '/GetSurveyResults?link=' + link,
      { headers: header, responseType: 'json' }).pipe(finalize(() => this.isRequestingSource.next(false)),
        map(res => Object.setPrototypeOf(res, new SurveyResults)
        ));
  }
}
