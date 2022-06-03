import React from 'react';
import { formatDate } from '../../../utils/formatDate';

const Date = ({ fhirData, isBlack, testId, className = '' }) => {
  if (!fhirData) {
    return null;
  }
  const locale = 'en-US';
  const dateValue = formatDate(String(fhirData).slice(0, 10), locale);

  return (
    <span
      data-testid={testId || 'providedDate'}
      className={`${[className, 'fhir-datatype__Date', 'font-source'].join(
        ' ',
      )}${isBlack ? '' : ' text-secondary'}`}
    >
      {dateValue}
    </span>
  );
};

export default Date;
