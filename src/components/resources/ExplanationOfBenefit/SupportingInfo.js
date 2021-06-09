import React from 'react';
import _get from 'lodash/get';

import { ValueSection, Value } from '../../ui/index';
import CodeableConcept from '../../datatypes/CodeableConcept';
import Date from '../../datatypes/Date';

const SupportingInfo = ({ fhirData }) => {
  return fhirData.map((supportingInfo, index) => {
    const sequence = _get(supportingInfo, 'sequence');
    const category = _get(supportingInfo, 'category');
    const code = _get(supportingInfo, 'code	');
    const timingDate = _get(supportingInfo, 'timingDate');
    const timingPeriodStart = _get(supportingInfo, 'timingPeriod.start');
    const timingPeriodEnd = _get(supportingInfo, 'timingPeriod.end');

    return (
      <div key={`total-${index}`}>
        <ValueSection
          label={`Supporting information ${sequence}.`}
          data-testid="supportingInfo"
        >
          {category && (
            <Value label="Category" data-testid="supportingInfo.category">
              <CodeableConcept fhirData={category} />
            </Value>
          )}
          {code && (
            <Value label="Code" data-testid="supportingInfo.code">
              <CodeableConcept fhirData={code} />
            </Value>
          )}
          {timingDate && (
            <Value label="Date" data-testid="supportingInfo.timingDate">
              <Date fhirData={timingDate} />
            </Value>
          )}
          {timingPeriodStart && (
            <Value
              label="Start date"
              data-testid="supportingInfo.timingPeriodStart"
            >
              <Date fhirData={timingPeriodStart} />
            </Value>
          )}
          {timingPeriodEnd && (
            <Value
              label="End date"
              data-testid="supportingInfo.timingPeriodEnd"
            >
              <Date fhirData={timingPeriodEnd} />
            </Value>
          )}
        </ValueSection>
      </div>
    );
  });
};

export default SupportingInfo;
