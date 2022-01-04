import _trim from 'lodash/trim';

export const convertCamelCaseToSentence = word => {
  const result = word && word.replace(/([A-Z])/g, ' $1');
  return (
    result &&
    _trim(result.charAt(0).toUpperCase() + result.slice(1)).toLowerCase()
  );
};
