import { convertCamelCaseToSentence } from './convertCamelCaseToSentence';

describe('convertCamelCaseToSentence function ', () => {
  it('should return sentence', () => {
    expect(convertCamelCaseToSentence('CamelCaseToSentence')).toEqual(
      'camel case to sentence',
    );
  });
});
