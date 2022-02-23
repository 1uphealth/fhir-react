import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';

import {
  Root,
  Header,
  Body,
  ValueSection,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  MissingValue,
} from '../../ui';
import CodeableConcept from '../../datatypes/CodeableConcept/CodeableConcept';
import Accordion from '../../containers/Accordion';

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
      <TableCell data-testid="dosageTiming">{timing}</TableCell>
      <TableCell data-testid="dosageRoute">{route}</TableCell>
      <TableCell data-testid="dosageQuantity">{doseQuantity}</TableCell>
      <TableCell data-testid="dosageAdditionalInstructions">
        <CodeableConcept fhirData={additionalInstructions} />
      </TableCell>
    </TableRow>
  );
};

const commonDTO = fhirResource => {
  const typeCoding = _get(fhirResource, 'type.coding.0');
  const whenPrepared = _get(fhirResource, 'whenPrepared');
  return {
    typeCoding,
    whenPrepared,
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
      if (_get(item, 'additionalInstructions.coding')) {
        data.additionalInstructions = _get(item, 'additionalInstructions', '');
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
      if (_get(item, 'additionalInstruction.0.coding')) {
        data.additionalInstructions = _get(item, 'additionalInstruction.0', '');
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

const r4DTO = fhirResource => {
  const prepareDosageInstructionData = rawData => {
    return rawData.map(item => {
      const data = {};
      data.route = _get(item, 'route.coding.0.display');
      if (_get(item, 'doseAndRate.0.doseQuantity')) {
        data.doseQuantity = `${_get(
          item,
          'doseAndRate.0.doseQuantity.value',
        )} ${_get(item, 'doseAndRate.0.doseQuantity.unit')}`;
      }
      if (_get(item, 'doseAndRate.0.type.coding')) {
        data.additionalInstructions = _get(item, 'doseAndRate.0.type');
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
    case fhirVersions.DSTU2: {
      return {
        ...commonDTO(fhirResource),
        ...dstu2DTO(fhirResource),
      };
    }
    case fhirVersions.STU3: {
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
      };
    }
    case fhirVersions.R4: {
      return {
        ...commonDTO(fhirResource),
        ...r4DTO(fhirResource),
      };
    }

    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const MedicationDispense = ({ fhirResource, fhirVersion, fhirIcons }) => {
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
    whenPrepared,
  } = fhirResourceData;

  const tableData = [
    {
      label: 'Medication',
      testId: 'medicationCoding',
      data: medicationCoding && <Coding fhirData={medicationCoding} />,
      status: medicationCoding,
    },
    {
      label: 'Prepared',
      testId: 'whenPrepared',
      data: whenPrepared && <Date fhirData={whenPrepared} />,
      status: whenPrepared,
    },
    {
      label: 'Type',
      testId: 'typeCoding',
      data: typeCoding && <Coding fhirData={typeCoding} />,
      status: typeCoding,
    },
  ];

  return (
    <Root name="MedicationDispense">
      <Accordion
        headerContent={
          <Header
            resourceName="MedicationDispense"
            title={medicationTitle}
            icon={fhirIcons}
          />
        }
        bodyContent={
          <Body tableData={tableData}>
            {hasDosageInstruction && (
              <ValueSection
                label="Dosage instruction"
                marginTop={medicationCoding || whenPrepared || typeCoding}
              >
                <Table>
                  <thead>
                    <TableRow>
                      <TableHeader>Timing</TableHeader>
                      <TableHeader>Route</TableHeader>
                      <TableHeader>Dose quantity</TableHeader>
                      <TableHeader>Additional instructions</TableHeader>
                    </TableRow>
                  </thead>
                  <tbody
                    data-testid="hasDosageInstruction"
                    className="border-top-0"
                  >
                    {dosageInstructionData.map((item, i) => (
                      <DosageInstruction key={`item-${i}`} item={item} />
                    ))}
                  </tbody>
                </Table>
              </ValueSection>
            )}
          </Body>
        }
      />
    </Root>
  );
};

MedicationDispense.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

export default MedicationDispense;
