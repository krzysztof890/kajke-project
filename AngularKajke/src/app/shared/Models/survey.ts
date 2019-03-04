import { Question } from './question';
import { SkipProperty } from '../classes/skip-property';

export class Survey {
  public constructor(init?: Partial<Survey>) {
    Object.assign(this, init);
  }

  Name: string;
  Description: string;
  HeaderErrors?: string;
  Questions?: Question[];

  /**
   * Zwraca obiekt klasy serializowany do JSON
   */
  toJSON(): string {
    // nowa kolekcja pytan ktora nie bedzie posiadala pola questionErrors, poniewaz nie ma potrzeby serializacji tego pola
    const questions = [];
    for (const item of this.Questions) {
      questions.push(SkipProperty.skipKeys(item, ['questionErrors']));
    }
    // nowy obiekt ktory zawiera tylko te pola ktore maja zostac serializowane do json
    const obj = {
      name: this.Name,
      description: this.Description,
      questions: questions
    };
    return JSON.stringify(obj);
  }
}
