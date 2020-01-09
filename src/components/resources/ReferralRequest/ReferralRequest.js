import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import fhirTypes from '../fhirResourceTypes';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';

const commonDTO = fhirResource => {
  const typeCoding = _get(fhirResource, 'type.coding.0');
  const status = _get(fhirResource, 'status');

  const description = _get(fhirResource, 'description');
  return {
    typeCoding,
    status,
    description,
  };
};
const dstu2DTO = fhirResource => {
  const requester = _get(fhirResource, 'requester.display');
  const reason = _get(fhirResource, 'reason.text');
  const dateSent = _get(fhirResource, 'dateSent');
  const subject = _get(fhirResource, 'patient.display');
  return { requester, reason, dateSent, subject };
};
const stu3DTO = fhirResource => {
  const reason = _get(fhirResource, 'reasonCode.0.text');
  const requester = _get(fhirResource, 'requester.agent.display');
  const dateSent = _get(fhirResource, 'authoredOn');
  const subject = _get(fhirResource, 'subject.display');
  return {
    reason,
    requester,
    dateSent,
    subject,
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

const ReferralRequest = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="ReferralRequest" />;
  }
  const {
    typeCoding,
    status,
    dateSent,
    reason,
    subject,
    requester,
    description,
  } = fhirResourceData;

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
            <td data-testid="subject">
              {subject ? <span>{subject}</span> : '---'}
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
  fhirVersion: PropTypes.oneOf([fhirTypes.DSTU2, fhirTypes.STU3]).isRequired,
};

export default ReferralRequest;
