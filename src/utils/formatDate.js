export const formatDate = (date, locale) => {
  const rawDate = new Date(date);
  const usDate = rawDate.toLocaleDateString(locale, whichOptions(date));
  return usDate;
};

const whichOptions = date => {
  const YEAR_FORMAT = 'YYYY';
  const YEAR_MONTH_FORMAT = 'YYYY-MM';

  if (date.length === YEAR_FORMAT.length) {
    return { year: 'numeric' };
  }
  if (date.length <= YEAR_MONTH_FORMAT.length) {
    return {
      year: 'numeric',
      month: 'long',
    };
  }
  return;
};
