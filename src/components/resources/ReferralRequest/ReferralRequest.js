import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import fhirVersions from '../fhirResourceVersions';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';

import {
  Root,
  Body,
  Value,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  MissingValue,
} from '../../ui';

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
    <Root name="ReferralRequest">
      <Body>
        {typeCoding && (
          <Value label="Type" data-testid="typeCoding">
            <Coding fhirData={typeCoding} />
          </Value>
        )}
        <div className="overflow-auto">
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Request sent</TableHeader>
                <TableHeader>Patient</TableHeader>
                <TableHeader>Requester</TableHeader>
                <TableHeader>status</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              <TableRow>
                <TableCell data-testid="dateSent">
                  {dateSent ? <Date fhirData={dateSent} /> : <MissingValue />}
                </TableCell>
                <TableCell data-testid="subject">
                  {subject ? <span>{subject}</span> : <MissingValue />}
                </TableCell>
                <TableCell data-testid="requester">
                  {requester ? <span>{requester}</span> : <MissingValue />}
                </TableCell>
                <TableCell data-testid="status">
                  {status ? <span>{status}</span> : <MissingValue />}
                </TableCell>
              </TableRow>
            </tbody>
          </Table>
        </div>
        {reason && <div data-testid="reason">{reason}</div>}
        {description && <small data-testid="description">{description}</small>}
      </Body>
    </Root>
  );
};

ReferralRequest.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirVersions.DSTU2, fhirVersions.STU3])
    .isRequired,
};

export default ReferralRequest;
