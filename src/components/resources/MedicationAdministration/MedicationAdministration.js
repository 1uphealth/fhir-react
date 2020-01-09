import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Reference from '../../datatypes/Reference';
import Date from '../../datatypes/Date';
import Coding from '../../datatypes/Coding';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirTypes from '../fhirResourceTypes';
import {
  Root,
  Header,
  Title,
  Badge,
  Body,
  Value,
  MissingValue,
  TableHeader,
  Table,
  TableCell,
  TableRow,
} from '../../ui';

const commonDTO = fhirResource => {
  const medicationReference = _get(fhirResource, 'medicationReference');
  const status = _get(fhirResource, 'status');

  const dosageRoute = _get(fhirResource, 'dosage.route.coding.0');

  return {
    medicationReference,

    dosageRoute,

    status,
  };
};
const dstu2DTO = fhirResource => {
  const periodTimeStart = _get(fhirResource, 'effectiveTimePeriod.start');
  const periodTimeEnd = _get(fhirResource, 'effectiveTimePeriod.end');
  const subject = _get(fhirResource, 'patient');
  const practitioner = _get(fhirResource, 'practitioner');
  const dosageQuantityVal = _get(fhirResource, 'dosage.quantity.value', '');
  const dosageQuantityUnit = _get(fhirResource, 'dosage.quantity.unit', '');
  const dosageQuantity = `${dosageQuantityVal} ${dosageQuantityUnit}`.trim();
  return {
    periodTimeStart,
    periodTimeEnd,
    subject,
    practitioner,
    dosageQuantity,
  };
};
const stu3DTO = fhirResource => {
  const periodTimeStart = _get(fhirResource, 'effectivePeriod.start');
  const periodTimeEnd = _get(fhirResource, 'effectivePeriod.end');
  const subject = _get(fhirResource, 'subject');
  const practitioner = _get(fhirResource, 'performer.0.actor');
  const dosageQuantityVal = _get(fhirResource, 'dosage.dose.value', '');
  const dosageQuantityUnit = _get(fhirResource, 'dosage.dose.unit', '');
  const dosageQuantity = `${dosageQuantityVal} ${dosageQuantityUnit}`.trim();
  return {
    periodTimeStart,
    periodTimeEnd,
    subject,
    practitioner,
    dosageQuantity,
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

const MedicationAdministration = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="Goal" />;
  }
  const {
    medicationReference,
    subject,
    practitioner,
    periodTimeStart,
    periodTimeEnd,
    dosageRoute,
    dosageQuantity,
    status,
  } = fhirResourceData;

  return (
    <Root name="MedicationAdministration">
      <Header>
        <Title>
          <Reference fhirData={medicationReference} />
        </Title>
        {status && <Badge data-testid="status">{status}</Badge>}
      </Header>
      <Body>
        {subject && (
          <Value label="Patient" data-testid="patient">
            <Reference fhirData={subject} />
          </Value>
        )}
        {practitioner && (
          <Value label="Practitioner" data-testid="practitioner">
            <Reference fhirData={practitioner} />
          </Value>
        )}
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Period start</TableHeader>
              <TableHeader>Period end</TableHeader>
              <TableHeader>Dosage route</TableHeader>
              <TableHeader>Dosage quantity</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            <TableRow>
              <TableCell data-testid="periodTimeStart">
                {periodTimeStart ? (
                  <Date fhirData={periodTimeStart} />
                ) : (
                  <MissingValue />
                )}
              </TableCell>
              <TableCell data-testid="periodTimeEnd">
                {periodTimeEnd ? (
                  <Date fhirData={periodTimeEnd} />
                ) : (
                  <MissingValue />
                )}
              </TableCell>
              <TableCell data-testid="dosageRoute">
                {dosageRoute ? (
                  <Coding fhirData={dosageRoute} />
                ) : (
                  <MissingValue />
                )}
              </TableCell>
              <TableCell data-testid="dosageQuantity">
                {dosageQuantity ? dosageQuantity : <MissingValue />}
              </TableCell>
            </TableRow>
          </tbody>
        </Table>
      </Body>
    </Root>
  );
};

MedicationAdministration.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirTypes.DSTU2, fhirTypes.STU3]).isRequired,
};

export default MedicationAdministration;
