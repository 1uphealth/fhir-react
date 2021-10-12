import React from 'react';
import { formatDate } from '../../../utils/formatDate';

const Date = props => {
  const { fhirData } = props;
  if (!fhirData) {
    return null;
  }
  const locale = 'en-US';
  const dateValue = formatDate(String(fhirData).slice(0, 10), locale);
  return (
    <span
      data-testid="providedDate"
      className="fhir-datatype__Date text-secondary"
    >
      {dateValue}
    </span>
  );
};

export default Date;
