import React from 'react';
import { formatDate } from '../../../utils/formatDate';

const Date = props => {
  const { fhirData, isBlack, testId, className = '' } = props;
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
