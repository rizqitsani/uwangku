import { format } from 'date-fns';
import id from 'date-fns/locale/id';

export const DATE_FORMAT = {
  /** 07 Desember 2022 21:55 */
  FULL: 'dd MMMM yyyy',
  /** 7 Desember 2022 21:55 */
  FULL_DATE_HOUR_MINUTE: 'd MMMM yyyy HH:mm',
};

export function formatLocale(
  date: Date,
  formatKey: keyof typeof DATE_FORMAT
): string {
  return format(date, DATE_FORMAT[formatKey], { locale: id });
}
