import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Reference from '../../datatypes/Reference';
import Date from '../../datatypes/Date';
import Coding from '../../datatypes/Coding';

const MedicationAdministration = props => {
  const { fhirResource } = props;
  const medicationReference = _get(fhirResource, 'medicationReference');
  const patient = _get(fhirResource, 'patient');
  const practitioner = _get(fhirResource, 'practitioner');
  const periodTimeStart = _get(fhirResource, 'effectiveTimePeriod.start');
  const periodTimeEnd = _get(fhirResource, 'effectiveTimePeriod.end');
  const dosageRoute = _get(fhirResource, 'dosage.route.coding.0');
  const dosageQuantityVal = _get(fhirResource, 'dosage.quantity.value', '');
  const dosageQuantityUnit = _get(fhirResource, 'dosage.quantity.unit', '');
  const dosageQuantity = `${dosageQuantityVal} ${dosageQuantityUnit}`.trim();
  return (
    <div>
      {medicationReference && (
        <div data-testid="medicationReference">
          <Reference fhirData={medicationReference} />
        </div>
      )}
      {patient && (
        <div data-testid="patient">
          <label>Patient:</label>
          <Reference fhirData={patient} />
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
};

export default MedicationAdministration;
