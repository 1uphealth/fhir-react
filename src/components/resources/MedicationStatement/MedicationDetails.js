import { ValueSection, ValueSectionItem } from '../../ui';
import React from 'react';
import Reference from '../../datatypes/Reference';
import _get from 'lodash/get';

const MedicationDetails = props => {
  const {
    medication,
    expiration,
    ingredient,
    medicationReference,
    hasReasonCode,
    reasonCode,
  } = props;
  return (
    <ValueSection label={medication} marginBottom>
      <div className="row">
        <ValueSectionItem label="Expiration date" data-testid="expirationDate">
          {expiration}
        </ValueSectionItem>
        {ingredient && (
          <ValueSectionItem label="Ingredient" data-testid="ingredient">
            {ingredient.map((item, i) => (
              <div key={`item-${i}`}>
                {_get(item, 'itemCodeableConcept.coding.0.display', '')}
              </div>
            ))}
          </ValueSectionItem>
        )}
        {medicationReference && (
          <ValueSectionItem
            label="Medication reference"
            data-testid="medicationReference"
          >
            {<Reference fhirData={medicationReference} />}
          </ValueSectionItem>
        )}
        {hasReasonCode && (
          <ValueSectionItem label="Reasons" data-testid="hasReasonCode">
            {reasonCode.map((item, i) => {
              const display = _get(item, 'coding.0.display');
              if (display) {
                return <div key={`item-${i}`}>{display}</div>;
              }
              return null;
            })}
          </ValueSectionItem>
        )}
      </div>
    </ValueSection>
  );
};

export default MedicationDetails;
