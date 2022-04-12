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
  Table,
  TableRow,
  TableHeader,
  TableCell,
  MissingValue,
  Header,
  ValueSection,
} from '../../ui';
import Accordion from '../../containers/Accordion';

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

const ReferralRequest = ({
  fhirResource,
  fhirVersion,
  fhirIcons,
  onClick,
  rawOnClick,
}) => {
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

  const tableData = [
    {
      testId: 'dateSent',
      data: <Date fhirData={dateSent} isBlack />,
      status: dateSent,
    },
    {
      testId: 'subject',
      data: <span>{subject}</span>,
      status: subject,
    },
    {
      testId: 'requester',
      data: <span>{requester}</span>,
      status: requester,
    },
    {
      testId: 'status',
      data: <span>{status}</span>,
      status: status,
    },
  ];

  return (
    <Root name="ReferralRequest">
      <Accordion
        headerContent={
          <Header
            resourceName="ReferralRequest"
            title={typeCoding && <Coding fhirData={typeCoding} />}
            icon={fhirIcons}
          />
        }
        bodyContent={
          <Body>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>Request sent</TableHeader>
                  <TableHeader>Patient</TableHeader>
                  <TableHeader>Requester</TableHeader>
                  <TableHeader>Status</TableHeader>
                </TableRow>
              </thead>
              <tbody className="border-top-0">
                <TableRow>
                  {tableData.map((element, index) => (
                    <TableCell key={index} data-testid={element.testId}>
                      {element.status ? element.data : <MissingValue />}
                    </TableCell>
                  ))}
                </TableRow>
              </tbody>
            </Table>
            {description && (
              <ValueSection label={reason} data-testid="reason" marginTop>
                <small className="text-secondary">{description}</small>
              </ValueSection>
            )}
          </Body>
        }
        onClick={onClick}
        rawOnClick={rawOnClick}
      />
    </Root>
  );
};

ReferralRequest.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirVersions.DSTU2, fhirVersions.STU3])
    .isRequired,
};

export default ReferralRequest;
