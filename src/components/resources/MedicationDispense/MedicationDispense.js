import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Coding from '../../datatypes/Coding';
import Reference from '../../datatypes/Reference';

const DosageInstruction = props => {
  const empty = '---';
  const {
    timing = empty,
    route = empty,
    doseQuantity = empty,
    additionalInstructions = empty,
  } = props.item;
  return (
    <tr>
      <td>{timing}</td>
      <td>{route}</td>
      <td>{doseQuantity}</td>
      <td>{additionalInstructions}</td>
    </tr>
  );
};

const prepareDosageInstructionData = rawData => {
  return rawData.map(item => {
    const data = {};
    data.route = _get(item, 'route.coding.0.display');
    if (_get(item, 'doseQuantity')) {
      data.doseQuantity = `${_get(item, 'doseQuantity.value')} ${_get(
        item,
        'doseQuantity.unit',
      )}`;
    }
    if (_get(item, 'additionalInstructions')) {
      data.additionalInstructions = _get(
        item,
        'additionalInstructions.coding.0.display',
        '',
      );
    }
    const timingRepeat = _get(item, 'timing.repeat');
    if (timingRepeat) {
      data.timing = `${timingRepeat.period} / ${timingRepeat.periodUnits}`;
    }

    return data;
  });
};

const MedicationDispense = props => {
  const { fhirResource } = props;
  const medicationReference = _get(fhirResource, 'medicationReference');
  const typeCoding = _get(fhirResource, 'type.coding.0');
  const dosageInstruction = _get(fhirResource, 'dosageInstruction');
  const hasDosageInstruction =
    Array.isArray(dosageInstruction) && dosageInstruction.length > 0;
  const dosageInstructionData = prepareDosageInstructionData(dosageInstruction);
  return (
    <div>
      {medicationReference && (
        <div data-testid="medication">
          <Reference fhirData={medicationReference} />
        </div>
      )}
      {typeCoding && (
        <div data-testid="typeCoding">
          <Coding fhirData={typeCoding} />
        </div>
      )}
      {hasDosageInstruction && (
        <div data-testid="hasDosageInstruction">
          <label>Dosage instruction</label>
          <table border="1">
            <thead>
              <tr>
                <th>Timing</th>
                <th>Route</th>
                <th>Dose quantity</th>
                <th>Additional instructions</th>
              </tr>
            </thead>
            <tbody>
              {dosageInstructionData.map((item, i) => (
                <DosageInstruction key={`item-${i}`} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

MedicationDispense.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default MedicationDispense;
