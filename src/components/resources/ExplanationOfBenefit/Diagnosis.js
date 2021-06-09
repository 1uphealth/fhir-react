import React from 'react';
import _get from 'lodash/get';

import { ValueSection, Value } from '../../ui/index';
import Reference from '../../datatypes/Reference';
import CodeableConcept from '../../datatypes/CodeableConcept';

const Diagnosis = ({ fhirData }) => {
  return fhirData.map((diagnosis, index) => {
    const sequence = _get(diagnosis, 'sequence');
    const reference = _get(diagnosis, 'diagnosisReference');
    const codeableConcept = _get(diagnosis, 'codeableConcept	');
    const type = _get(diagnosis, 'type');

    return (
      <div key={`total-${index}`}>
        <ValueSection
          label={`Diagnosis ${sequence}.`}
          data-testid="hasServices"
        >
          {reference && (
            <Value label="Diagnosis" data-testid="reference">
              <Reference fhirData={reference} />
            </Value>
          )}
          {codeableConcept && (
            <Value label="Diagnosis" data-testid="codeableConcept">
              <CodeableConcept fhirData={codeableConcept} />
            </Value>
          )}
          {type && (
            <Value label="Type" data-testid="type">
              <CodeableConcept fhirData={type} />
            </Value>
          )}
        </ValueSection>
      </div>
    );
  });
};

export default Diagnosis;
