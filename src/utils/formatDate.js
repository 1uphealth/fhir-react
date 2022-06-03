export const formatDate = (date, locale) => {
  const rawDate = new Date(date);
  return rawDate.toLocaleDateString(locale, whichOptions(date));
};

const whichOptions = date => {
  const YEAR_FORMAT = 'YYYY';
  const YEAR_MONTH_FORMAT = 'YYYY-MM';

  if (date.length === YEAR_FORMAT.length) {
    return { year: 'numeric', timeZone: 'UTC' };
  }
  if (date.length <= YEAR_MONTH_FORMAT.length) {
    return {
      year: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    };
  }
  return {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  };
};
