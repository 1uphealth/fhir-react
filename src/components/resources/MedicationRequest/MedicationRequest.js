import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Reference from '../../datatypes/Reference';
import CodeableConcept from '../../datatypes/CodeableConcept';
import Coding from '../../datatypes/Coding';

const MedicationRequest = props => {
  const { fhirResource } = props;
  const medicationReference = _get(fhirResource, 'medicationReference');
  const medicationCodeableConcept = _get(
    fhirResource,
    'medicationCodeableConcept.coding.0',
  );
  const showMedicationCodeableConcept =
    !medicationReference && medicationCodeableConcept;
  const reasonCode = _get(fhirResource, 'reasonCode', []);
  const dosageInstruction = _get(fhirResource, 'dosageInstruction');
  const hasDosageInstruction =
    Array.isArray(dosageInstruction) && dosageInstruction.length > 0;
  return (
    <div>
      {medicationReference && (
        <div data-testid="medication">
          <label>Medication</label>
          <br />
          <Reference fhirData={medicationReference} />
        </div>
      )}
      {showMedicationCodeableConcept && (
        <div data-testid="medication">
          <label>Medication</label>
          <Coding fhirData={medicationCodeableConcept} />
        </div>
      )}
      {reasonCode && (
        <div data-testid="reasonCode">
          <label>Reason</label>
          <CodeableConcept fhirData={reasonCode} />
        </div>
      )}
      {hasDosageInstruction && (
        <div data-testid="hasDosageInstruction">
          <label>Dosage</label>
          <ul>
            {dosageInstruction.map((item, i) => (
              <li key={`item-${i}`}>{item.text}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

MedicationRequest.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default MedicationRequest;
