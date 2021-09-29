export const formatDate = (date, locale) => {
  const rawDate = new Date(date);
  const usDate = rawDate.toLocaleDateString(locale);
  return usDate;
};
