import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';

const ReferralRequest = props => {
  const { fhirResource } = props;
  const typeCoding = _get(fhirResource, 'type.coding.0');
  const status = _get(fhirResource, 'status');
  const dateSent = _get(fhirResource, 'dateSent');
  const reason = _get(fhirResource, 'reason.text');
  const patient = _get(fhirResource, 'patient.display');
  const requester = _get(fhirResource, 'requester.display');
  const description = _get(fhirResource, 'description');
  return (
    <div>
      {typeCoding && (
        <div data-testid="typeCoding">
          <Coding fhirData={typeCoding} />
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Request sent</th>
            <th>Patient</th>
            <th>Requester</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-testid="dateSent">
              {dateSent ? <Date fhirData={dateSent} /> : '---'}
            </td>
            <td data-testid="patient">
              {patient ? <span>{patient}</span> : '---'}
            </td>
            <td data-testid="requester">
              {requester ? <span>{requester}</span> : '---'}
            </td>
            <td data-testid="status">
              {status ? <span>{status}</span> : '---'}
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              {reason && <div data-testid="reason">{reason}</div>}
              {description && (
                <small data-testid="description">{description}</small>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

ReferralRequest.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default ReferralRequest;
