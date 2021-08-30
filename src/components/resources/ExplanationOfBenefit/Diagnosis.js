import React from 'react';
import _get from 'lodash/get';

import { ValueSection, Value } from '../../ui/index';
import Reference from '../../datatypes/Reference';
import CodeableConcept from '../../datatypes/CodeableConcept';

const Diagnosis = ({ fhirData }) => {
  return fhirData.map((diagnosis, index) => {
    const sequence = _get(diagnosis, 'sequence');
    const id = _get(diagnosis, 'id');
    const reference = _get(diagnosis, 'diagnosisReference');
    const codeableConcept = _get(diagnosis, 'diagnosisCodeableConcept');
    const type = _get(diagnosis, 'type');
    const onAdmission = _get(diagnosis, 'onAdmission');
    const packageCode = _get(diagnosis, 'packageCode');

    return (
      <div key={`total-${index}`}>
        <ValueSection
          label={`Diagnosis ${sequence}${id ? ` (id: ${id})` : ''}`}
          data-testid="diagnosis"
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
            <Value label="Type" data-testid="diagnosisType">
              <CodeableConcept fhirData={type} />
            </Value>
          )}
          {onAdmission && (
            <Value label="On admission" data-testid="diagnosisOnAdmission">
              <CodeableConcept fhirData={onAdmission} />
            </Value>
          )}
          {packageCode && (
            <Value label="Package code" data-testid="diagnosisPackageCode">
              <CodeableConcept fhirData={packageCode} />
            </Value>
          )}
        </ValueSection>
      </div>
    );
  });
};

export default Diagnosis;
