export class CardUtils {
  static maskNumber(number: number, symbol: string = '*'): string {
    return new String(number).replace(/\d(?=\d{4})/g, symbol);
  }

  static maskLastDigits(number: number): string {
    return '*** ' + this.maskNumber(number, '');
  }
}
