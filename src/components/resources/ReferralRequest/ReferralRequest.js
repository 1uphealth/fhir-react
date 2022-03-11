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
  Header,
  ValueSection,
} from '../../ui';
import Accordion from '../../containers/Accordion';
import CodeableConcept from '../../datatypes/CodeableConcept';

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

const ReferralRequest = ({ fhirResource, fhirVersion, fhirIcons }) => {
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
      label: 'Type',
      testId: 'typeCoding',
      data: typeCoding && <Coding fhirData={typeCoding} isCursive />,
      status: typeCoding,
    },
  ];

  const tableData2 = [
    {
      testId: 'dateSent',
      data: <Date fhirData={dateSent} />,
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
            title="Referral Request"
            icon={fhirIcons}
          />
        }
        bodyContent={
          <Body tableData={tableData}>
            <ValueSection className="overflow-auto">
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader>Request sent</TableHeader>
                    <TableHeader>Patient</TableHeader>
                    <TableHeader>Requester</TableHeader>
                    <TableHeader>status</TableHeader>
                  </TableRow>
                </thead>
                <tbody className="border-top-0">
                  <TableRow>
                    {tableData2.map((element, index) => (
                      <TableCell key={index} data-testid={element.testId}>
                        {element.status ? element.data : <MissingValue />}
                      </TableCell>
                    ))}
                  </TableRow>
                </tbody>
              </Table>
            </ValueSection>
            {reason && (
              <ValueSection label="Reason" data-testid="reason" marginTop>
                <small className="text-secondary">{reason}</small>
              </ValueSection>
            )}
            {description && (
              <ValueSection
                label="Description"
                data-testid="description"
                marginTop
              >
                <small className="text-secondary">{description}</small>
              </ValueSection>
            )}
          </Body>
        }
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
