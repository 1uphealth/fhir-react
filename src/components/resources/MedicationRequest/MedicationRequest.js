import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Reference from '../../datatypes/Reference';
import CodeableConcept from '../../datatypes/CodeableConcept';
import Coding from '../../datatypes/Coding';

import { Root, Header, Title, Body, Value } from '../../ui';

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
    <Root name="medicationRequest">
      <Header>
        <Title>
          {medicationReference && <Reference fhirData={medicationReference} />}
        </Title>
      </Header>
      <Body>
        {showMedicationCodeableConcept && (
          <Value label="Medication" data-testid="medication">
            <Coding fhirData={medicationCodeableConcept} />
          </Value>
        )}
        {reasonCode && (
          <Value label="Reason" data-testid="reasonCode">
            <CodeableConcept fhirData={reasonCode} />
          </Value>
        )}
        {hasDosageInstruction && (
          <Value label="Dosage" data-testid="hasDosageInstruction">
            <ul>
              {dosageInstruction.map((item, i) => (
                <li key={`item-${i}`}>{item.text}</li>
              ))}
            </ul>
          </Value>
        )}
      </Body>
    </Root>
  );
};

MedicationRequest.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default MedicationRequest;
