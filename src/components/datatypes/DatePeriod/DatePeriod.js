import Date from '../Date';
import React from 'react';

const DatePeriod = props => {
  const {
    periodBeginLabel,
    periodBeginDate,
    periodEndLabel,
    periodEndDate,
  } = props;
  if (!periodBeginDate && !periodEndDate) {
    return null;
  }

  return (
    <div className="d-flex">
      {periodBeginDate && (
        <div>
          <span className="text-black-50 me-2 font-source fw-normal lh-lg">
            {periodBeginLabel}
          </span>
          <Date isBlack fhirData={periodBeginDate} />
        </div>
      )}
      {periodEndDate && (
        <div className="ms-4">
          <span className="text-black-50 me-2 font-source fw-normal lh-lg">
            {periodEndLabel}
          </span>
          <Date isBlack fhirData={periodEndDate} />
        </div>
      )}
    </div>
  );
};

export default DatePeriod;
