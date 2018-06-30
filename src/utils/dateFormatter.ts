export class DateFormatter {
  static formatDate(date) {
    let options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    return new Date(parseInt(date)).toLocaleDateString('en-GB', options);
  }
}
