import Date from '../Date';
import React from 'react';

const DatePeriod = props => {
  const {
    periodBeginLabel,
    periodBeginDate,
    periodBeginTestId,
    periodEndLabel,
    periodEndDate,
    periodEndTestId,
  } = props;

  const SingleDateSpan = props => (
    <span className="fhir-datetype__DatePeriod__begin-date text-black-50 me-2 font-source fw-normal lh-lg">
      {props.label}
    </span>
  );

  return (
    <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-start">
      {periodBeginDate && (
        <div className="d-flex flex-wrap align-items-center">
          <SingleDateSpan label={periodBeginLabel} />
          <Date testId={periodBeginTestId} isBlack fhirData={periodBeginDate} />
        </div>
      )}
      {periodEndDate && (
        <div className="ms-sm-4 d-flex flex-wrap align-items-center">
          <SingleDateSpan label={periodEndLabel} />
          <Date testId={periodEndTestId} isBlack fhirData={periodEndDate} />
        </div>
      )}
    </div>
  );
};

export default DatePeriod;
