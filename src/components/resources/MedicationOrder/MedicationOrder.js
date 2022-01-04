import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Accordion from '../../containers/Accordion/Accordion';
import Reference from '../../datatypes/Reference';
import CodeableConcept from '../../datatypes/CodeableConcept';
import Coding from '../../datatypes/Coding';

import { Root, Header, Body } from '../../ui';

const MedicationOrder = props => {
  const { fhirResource } = props;
  const medicationReference = _get(fhirResource, 'medicationReference');
  const medicationCodeableConcept = _get(
    fhirResource,
    'medicationCodeableConcept.coding.0',
  );
  const showMedicationCodeableConcept =
    !medicationReference && medicationCodeableConcept;
  const reasonCode = [_get(fhirResource, 'reasonCodeableConcept')].filter(
    el => !!el,
  );
  const dosageInstruction = _get(fhirResource, 'dosageInstruction');
  const hasDosageInstruction =
    Array.isArray(dosageInstruction) && dosageInstruction.length > 0;

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
    <Root name="MedicationOrder">
      <Accordion
        headerContent={
          <Header
            resourceName="MedicationOrder"
            title={
              medicationReference && (
                <Reference fhirData={medicationReference} />
              )
            }
          />
        }
        bodyContent={<Body tableData={tableData} />}
      />
    </Root>
  );
};

MedicationOrder.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default MedicationOrder;
