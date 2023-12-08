export default class Sorts {
  static sortByDate(a, b) {
    const dateA = new Date(a);
    const dateB = new Date(b);

    return dateA - dateB;
  }
  static sortByLocaleCompare(a, b) {
    return a.localeCompare(b);
  }

  static sortByBool(a, b) {
    return a === b ? 0 : a ? -1 : 1
  }

  static sortByNumber(a, b) {
    return +a - +b
  }
}