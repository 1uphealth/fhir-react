import React from 'react';

import Date from '../Date/index';

const Period = props => {
  const { fhirData } = props;
  if (!fhirData) {
    return null;
  }

  const start = String(fhirData.start).slice(0, 10);
  const end = String(fhirData.end).slice(0, 10);
  return (
    <div>
      {start && (
        <span>
          From: <Date fhirData={start} />
          {end && '; '}
        </span>
      )}
      {end && (
        <span>
          To: <Date fhirData={end} />
        </span>
      )}
    </div>
  );
};

export default Period;
