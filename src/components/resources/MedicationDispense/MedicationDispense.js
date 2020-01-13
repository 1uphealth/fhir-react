import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Coding from '../../datatypes/Coding';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirTypes from '../fhirResourceTypes';

import {
  Root,
  Header,
  Title,
  Body,
  Value,
  ValueSection,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  MissingValue,
} from '../../ui';

const DosageInstruction = props => {
  const empty = <MissingValue />;
  const {
    timing = empty,
    route = empty,
    doseQuantity = empty,
    additionalInstructions = empty,
  } = props.item;
  return (
    <TableRow>
      <TableCell>{timing}</TableCell>
      <TableCell>{route}</TableCell>
      <TableCell>{doseQuantity}</TableCell>
      <TableCell>{additionalInstructions}</TableCell>
    </TableRow>
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
  const medicationTitle = _get(fhirResource, 'medicationReference.display');
  const dosageInstruction = _get(fhirResource, 'dosageInstruction', []);
  const hasDosageInstruction =
    Array.isArray(dosageInstruction) && dosageInstruction.length > 0;
  const dosageInstructionData = prepareDosageInstructionData(dosageInstruction);
  return { hasDosageInstruction, dosageInstructionData, medicationTitle };
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
  const medicationTitle =
    _get(fhirResource, 'medicationReference.display') ||
    _get(fhirResource, 'contained[0].code.coding[0].display');
  const medicationCoding = _get(fhirResource, 'contained[0].code.coding[0]');
  const dosageInstruction = _get(fhirResource, 'dosageInstruction', []);
  const hasDosageInstruction =
    Array.isArray(dosageInstruction) && dosageInstruction.length > 0;
  const dosageInstructionData = prepareDosageInstructionData(dosageInstruction);
  return {
    medicationTitle,
    medicationCoding,
    hasDosageInstruction,
    dosageInstructionData,
  };
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
    medicationTitle,
    medicationCoding,
    typeCoding,
    hasDosageInstruction,
    dosageInstructionData,
  } = fhirResourceData;

  return (
    <Root name="medicationDispense">
      {medicationTitle && (
        <Header>
          <Title>{medicationTitle}</Title>
        </Header>
      )}
      <Body>
        {medicationCoding && (
          <Value label="Medication" data-testid="medicationCoding">
            <Coding fhirData={medicationCoding} />
          </Value>
        )}
        {typeCoding && (
          <Value label="Type" data-testid="typeCoding">
            <Coding fhirData={typeCoding} />
          </Value>
        )}
        {hasDosageInstruction && (
          <ValueSection label="Dosage instruction">
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>Timing</TableHeader>
                  <TableHeader>Route</TableHeader>
                  <TableHeader>Dose quantity</TableHeader>
                  <TableHeader>Additional instructions</TableHeader>
                </TableRow>
              </thead>
              <tbody data-testid="hasDosageInstruction">
                {dosageInstructionData.map((item, i) => (
                  <DosageInstruction key={`item-${i}`} item={item} />
                ))}
              </tbody>
            </Table>
          </ValueSection>
        )}
      </Body>
    </Root>
  );
};

MedicationDispense.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirTypes.DSTU2, fhirTypes.STU3]).isRequired,
};

export default MedicationDispense;
