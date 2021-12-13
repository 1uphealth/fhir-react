import React from 'react';
import _get from 'lodash/get';

import { Value } from '../../ui/index';
import Reference from '../../datatypes/Reference';
import CodeableConcept from '../../datatypes/CodeableConcept';
import Identifier from '../../datatypes/Identifier/Identifier';

const Related = ({ fhirData }) => {
  return fhirData.map((related, index) => {
    const claim = _get(related, 'claim');
    const relationship = _get(related, 'relationship');
    const reference = _get(related, 'reference	');

    return (
      <div key={`total-${index}`}>
        {claim && (
          <Value label="Claim" data-testid="claim" dirColumn>
            <Reference fhirData={claim} />
          </Value>
        )}
        {relationship && (
          <Value label="Relationship" data-testid="relationship" dirColumn>
            <CodeableConcept fhirData={relationship} />
          </Value>
        )}
        {reference && (
          <Value label="Reference" data-testid="reference" dirColumn>
            <Identifier fhirData={reference} />
          </Value>
        )}
      </div>
    );
  });
};

export default Related;
