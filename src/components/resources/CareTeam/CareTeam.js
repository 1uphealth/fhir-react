import {
  Badge,
  Body,
  Header,
  MissingValue,
  Root,
  ValueSection,
} from '../../ui';

import CareTeamParticipants from './CareTeamParticipants';
import CodableConcept from '../../datatypes/CodeableConcept';
import DateType from '../../datatypes/Date';
import PropTypes from 'prop-types';
import React from 'react';
import Reference from '../../datatypes/Reference';
import _get from 'lodash/get';
import fhirVersions from '../fhirResourceVersions';
import Accordion from '../../containers/Accordion';

const commonDTO = fhirResource => {
  // Default value for title - "Care team"
  const name = _get(fhirResource, 'name', 'Care team');
  const status = _get(fhirResource, 'status');
  const periodStart = _get(fhirResource, 'period.start');
  const periodEnd = _get(fhirResource, 'period.end');
  const category = _get(fhirResource, 'category');
  const subject = _get(fhirResource, 'subject');
  const managingOrganization =
    _get(fhirResource, 'managingOrganization[0]') ||
    _get(fhirResource, 'managingOrganization');

  const participants = _get(fhirResource, 'participant', []).map(item => {
    const display = _get(item, 'member.display');
    const role = _get(item, 'role.text') || _get(item, 'role.coding.0.display');
    const periodStart = _get(item, 'period.start');
    const periodEnd = _get(item, 'period.end');

    return {
      display,
      role,
      periodStart,
      periodEnd,
    };
  });

  return {
    name,
    status,
    periodStart,
    periodEnd,
    participants,
    category,
    subject,
    managingOrganization,
  };
};

const r4DTO = fhirResource => {
  const encounter = _get(fhirResource, 'encounter');

  return {
    encounter,
  };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    // Component doesn't exist in DSTU2
    case fhirVersions.STU3: {
      return {
        ...commonDTO(fhirResource),
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

const CareTeam = ({ fhirResource, fhirVersion, fhirIcons }) => {
  const {
    name,
    status,
    periodStart,
    periodEnd,
    participants,
    category,
    subject,
    encounter,
    managingOrganization,
  } = resourceDTO(fhirVersion, fhirResource);
  const hasParticipants = participants.length > 0;

  const tableData = [
    {
      label: 'Category',
      testId: 'category',
      data: category && <CodableConcept fhirData={category} isCursive />,
      status: category,
    },
    {
      label: 'Subject',
      testId: 'subject',
      data: subject && <Reference fhirData={subject} />,
      status: subject,
    },
    {
      label: 'Encounter',
      testId: 'encounter',
      data: encounter && <Reference fhirData={encounter} />,
      status: encounter,
    },
    {
      label: 'Managing organization',
      testId: 'managingOrganization',
      data: managingOrganization && (
        <Reference fhirData={managingOrganization} />
      ),
      status: managingOrganization,
    },
    {
      label: 'Care Period Start',
      testId: 'periodStart',
      data: periodStart ? (
        <DateType fhirData={periodStart} isBlack />
      ) : (
        <MissingValue />
      ),
      status: periodStart,
    },
    {
      label: 'Care Period End',
      testId: 'periodEnd',
      data: periodEnd ? (
        <DateType fhirData={periodEnd} isBlack />
      ) : (
        <MissingValue />
      ),
      status: periodEnd,
    },
  ];

  return (
    <Root name="CareTeam">
      <Accordion
        headerContent={
          <Header
            resourceName={'CareTeam'}
            icon={fhirIcons}
            title={name}
            badges={status && <Badge data-testid="status">{status}</Badge>}
          />
        }
        bodyContent={
          <Body tableData={tableData}>
            <ValueSection>
              {hasParticipants && (
                <CareTeamParticipants participants={participants} />
              )}
            </ValueSection>
          </Body>
        }
      />
    </Root>
  );
};

CareTeam.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]),
};

export default CareTeam;
