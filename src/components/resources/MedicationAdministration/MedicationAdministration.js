import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Reference from '../../datatypes/Reference';
import Date from '../../datatypes/Date';
import Coding from '../../datatypes/Coding';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirTypes from '../fhirResourceTypes';

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
    <div>
      {medicationReference && (
        <div data-testid="medicationReference">
          <Reference fhirData={medicationReference} />
        </div>
      )}
      {status && <span data-testid="status">{status}</span>}
      {subject && (
        <div data-testid="patient">
          <label>Patient:</label>
          <Reference fhirData={subject} />
        </div>
      )}
      {practitioner && (
        <div data-testid="practitioner">
          <label>Practitioner:</label>
          <Reference fhirData={practitioner} />
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Period start</th>
            <th>Period end</th>
            <th>Dosage route</th>
            <th>Dosage quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-testid="periodTimeStart">
              {periodTimeStart ? <Date fhirData={periodTimeStart} /> : '---'}
            </td>
            <td data-testid="periodTimeEnd">
              {periodTimeEnd ? <Date fhirData={periodTimeEnd} /> : '---'}
            </td>
            <td data-testid="dosageRoute">
              {dosageRoute ? <Coding fhirData={dosageRoute} /> : ' ---'}
            </td>
            <td data-testid="dosageQuantity">
              {dosageQuantity ? dosageQuantity : ' ---'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

MedicationAdministration.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirTypes.DSTU2, fhirTypes.STU3]).isRequired,
};

export default MedicationAdministration;
