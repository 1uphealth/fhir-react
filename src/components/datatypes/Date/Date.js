import React from 'react';
import { formatDate } from '../../../utils/formatDate';

const Date = props => {
  const { fhirData, isBlack, testId } = props;
  if (!fhirData) {
    return null;
  }
  const locale = 'en-US';
  const dateValue = formatDate(String(fhirData).slice(0, 10), locale);
  return (
    <span
      data-testid={testId || 'providedDate'}
      className={`fhir-datatype__Date${isBlack ? '' : ' text-secondary'}`}
    >
      {dateValue}
    </span>
  );
};

export default Date;
