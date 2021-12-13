export function toTrimedFixedNumber(number, digits = 4) {
  const n = Number(number);
  if (isNaN(n)) return number;
  const removeZerosRegex = /\.?0*$/;
  return Number(n.toFixed(digits).replace(removeZerosRegex, ''));
}

export const isNotEmptyArray = data => Array.isArray(data) && data.length > 0;

export const parseValueIntoMonetaryValueOfGivenCurrency = (value, currency) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(Math.round(value * 100) / 100);
};
