/**
 * Szablon validatora
 */
export interface Validator {
  /**
   * Przyjmuje wartośc i poddaje ja sprawdzeniu poprawności
   * @param value Wartość parametru ktory ma zostac poddany sprawdzeniu poprawności
   * @returns Zwraca czy wartość jest poprawna (isValid) oraz treść błedu (errorMessage)
   */
  validate(value: any): { isValid: boolean, errorMessage?: string };
}
