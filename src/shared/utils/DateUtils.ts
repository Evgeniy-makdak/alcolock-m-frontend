export class DateUtils {
  // TODO => понять почему прибавляют 1 день
  // TODO => сделать на dayjs
  static getEndFilterDate(dateStr: string) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);

    return date.toISOString();
  }
}
