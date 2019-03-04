/**
 * Klasa ktore przechowuje wiadomosci wyswietlane w przypadku nieudanej walidacji danych
 */
export class ValidatorMessages {
  /**
   * Wiadmośc ktora informuje o tym że pole jest wymagane
   */
  public static RequiredField = ' Pole nie może pozostać puste lub nie wybrane';
  /**
   * Wiadomość ktora informuje o tym ze przekroczona maksymalna dlugośc
   * @length długość jaka przekroczona
   */
  public static MaximumLengthEexceeded = (length: number): string => ' Przekroczono maksymalną długość ' + length + ' znakow ';
}
