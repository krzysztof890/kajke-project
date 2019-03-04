import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Ustawienia aplikacji
 */
export class ConfigService {
  private apiURI: string;
  private apUri: string;

  // tu ustawiasz bazowa ciezki do api przeneis potem do json czy cos po bedzie tragedi jesli nie
  constructor() {
    this.apiURI = 'https://localhost:44321/api';
    this.apUri = 'localhost:4200';
  }

  getApURI() {
    return this.apUri;
  }
  getApiURI(): string {
    return this.apiURI;
  }
}
