import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Accordion from '../../containers/Accordion/Accordion';
import Reference from '../../datatypes/Reference';
import CodeableConcept from '../../datatypes/CodeableConcept';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';

import { Root, Header, Body } from '../../ui';

const MedicationRequest = props => {
  const { fhirResource } = props;
  const medicationReference = _get(fhirResource, 'medicationReference');
  const medicationCodeableConcept = _get(
    fhirResource,
    'medicationCodeableConcept.coding.0',
  );
  const showMedicationCodeableConcept =
    !medicationReference && medicationCodeableConcept;
  const reasonCode = _get(fhirResource, 'reasonCode');
  const dosageInstruction = _get(fhirResource, 'dosageInstruction');
  const hasDosageInstruction =
    Array.isArray(dosageInstruction) && dosageInstruction.length > 0;
  const requester =
    _get(fhirResource, 'requester.agent') || _get(fhirResource, 'requester');
  const created = _get(fhirResource, 'authoredOn');
  const intent = _get(fhirResource, 'intent');
  const tableData = [
    {
      label: 'Medication',
      testId: 'medication',
      data: showMedicationCodeableConcept && (
        <Coding fhirData={medicationCodeableConcept} />
      ),
      status: showMedicationCodeableConcept,
    },
    {
      label: 'Requester',
      testId: 'requester',
      data: requester && <Reference fhirData={requester} />,
      status: requester,
    },
    {
      label: 'Created',
      testId: 'created',
      data: created && <Date fhirData={created} />,
      status: created,
    },
    {
      label: 'Type of request',
      testId: 'intent',
      data: intent,
      status: intent,
    },
    {
      label: 'Reason',
      testId: 'reasonCode',
      data: reasonCode && <CodeableConcept fhirData={reasonCode} />,
      status: reasonCode,
    },
    {
      label: 'Dosage',
      testId: 'hasDosageInstruction',
      data:
        hasDosageInstruction &&
        dosageInstruction.map((item, i) => (
          <p key={`dosage-instruction-item-${i}`}>{item.text}</p>
        )),
      status: hasDosageInstruction,
    },
  ];

  return (
    <Root name="MedicationRequest">
      <Accordion
        headerContent={
          <Header
            resourceName="MedicationRequest"
            title={
              medicationReference ? (
                <Reference fhirData={medicationReference} />
              ) : (
                'Medication request'
              )
            }
          />
        }
        bodyContent={<Body tableData={tableData} />}
      />
    </Root>
  );
};

MedicationRequest.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default MedicationRequest;
