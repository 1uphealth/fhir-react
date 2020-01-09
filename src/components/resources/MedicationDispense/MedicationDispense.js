import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Coding from '../../datatypes/Coding';
import Reference from '../../datatypes/Reference';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirTypes from '../fhirResourceTypes';

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

const commonDTO = fhirResource => {
  const typeCoding = _get(fhirResource, 'type.coding.0');

  return {
    typeCoding,
  };
};

const dstu2DTO = fhirResource => {
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
  const medicationReference = _get(fhirResource, 'medicationReference');
  const dosageInstruction = _get(fhirResource, 'dosageInstruction', []);
  const hasDosageInstruction =
    Array.isArray(dosageInstruction) && dosageInstruction.length > 0;
  const dosageInstructionData = prepareDosageInstructionData(dosageInstruction);
  return { hasDosageInstruction, dosageInstructionData, medicationReference };
};

const stu3DTO = fhirResource => {
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
      if (_get(item, 'additionalInstruction')) {
        data.additionalInstructions = _get(
          item,
          'additionalInstruction.0.coding.0.display',
          '',
        );
      }
      const timingRepeat = _get(item, 'timing.repeat');
      if (timingRepeat) {
        data.timing = `${timingRepeat.period} / ${timingRepeat.periodUnit}`;
      }

      return data;
    });
  };
  const medicationReference = _get(fhirResource, 'contained.0.code.coding.0');
  const dosageInstruction = _get(fhirResource, 'dosageInstruction', []);
  const hasDosageInstruction =
    Array.isArray(dosageInstruction) && dosageInstruction.length > 0;
  const dosageInstructionData = prepareDosageInstructionData(dosageInstruction);
  return { medicationReference, hasDosageInstruction, dosageInstructionData };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirTypes.DSTU2: {
      return {
        ...commonDTO(fhirResource),
        ...dstu2DTO(fhirResource),
      };
    }
    case fhirTypes.STU3: {
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
      };
    }

    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const MedicationDispense = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="MedicationDispense" />;
  }

  const {
    medicationReference,
    typeCoding,
    hasDosageInstruction,
    dosageInstructionData,
  } = fhirResourceData;

  return (
    <div className="fhir-resource fhir-resource__medicationDispense">
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
  fhirVersion: PropTypes.oneOf(['dstu2', 'stu3']).isRequired,
};

export default MedicationDispense;
