import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import Coding from '../../datatypes/Coding';
import DateType from '../../datatypes/Date';
import Reference from '../../datatypes/Reference';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';

import {
  Root,
  Header,
  Title,
  Badge,
  BadgeSecondary,
  Body,
  MissingValue,
  Value,
  ValueSection,
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from '../../ui';

const commonDTO = fhirResource => {
  const id = _get(fhirResource, 'id');
  const use = _get(fhirResource, 'use');
  const created = _get(fhirResource, 'created');
  const organization = _get(fhirResource, 'organization');
  return { id, use, created, organization };
};
const dstu2DTO = fhirResource => {
  const status = undefined;
  const typeCoding = {
    code: _get(fhirResource, 'type'),
    system: 'http://hl7.org/fhir/ValueSet/claim-type-link',
  };
  const insurer = _get(fhirResource, 'target');
  const payeeCoding = _get(fhirResource, 'payee.type');
  const payeeParty =
    _get(fhirResource, 'payee.provider') ||
    _get(fhirResource, 'payee.organization') ||
    _get(fhirResource, 'payee.person');
  const careTeam = [];
  const priorityCoding = _get(fhirResource, 'priority');
  return {
    status,
    typeCoding,
    insurer,
    payee: { coding: payeeCoding, party: payeeParty },
    careTeam,
    priorityCoding,
  };
};
const stu3DTO = fhirResource => {
  const status = _get(fhirResource, 'status');
  const typeCoding = _get(fhirResource, 'type.coding[0]');
  const insurer = _get(fhirResource, 'insurer');
  const payeeCoding = _get(fhirResource, 'payee.type.coding[0]');
  const payeeParty = _get(fhirResource, 'payee.party');
  const careTeam = _get(fhirResource, 'careTeam', []).map(team => {
    const provider = team.provider;
    const role = _get(team, 'role.coding[0]');
    const qualification = _get(team, 'role.coding[0]');
    return { provider, role, qualification };
  });
  const priorityCoding = _get(fhirResource, 'priority.coding[0]');
  return {
    status,
    typeCoding,
    insurer,
    payee: { coding: payeeCoding, party: payeeParty },
    careTeam,
    priorityCoding,
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

const CareTeam = props => {
  const { careTeam } = props;

  return (
    <ValueSection label="Care Team" data-testid="careTeam">
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Role</TableHeader>
            <TableHeader>Qualification</TableHeader>
            <TableHeader>Provider</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {careTeam.map((member, idx) => (
            <TableRow key={idx}>
              <TableCell data-testid="careTeam.role">
                {member.role ? (
                  <Coding fhirData={member.role} />
                ) : (
                  <MissingValue />
                )}
              </TableCell>
              <TableCell data-testid="careTeam.qualification">
                {careTeam.qualification ? (
                  <Coding fhirData={member.qualification} />
                ) : (
                  <MissingValue />
                )}
              </TableCell>
              <TableCell data-testid="careTeam.provider">
                <Reference fhirData={member.provider} />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </ValueSection>
  );
};

const Claim = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="Claim" />;
  }
  const {
    id,
    status,
    use,
    typeCoding,
    created,
    insurer,
    organization,
    priorityCoding,
    payee,
    careTeam,
  } = fhirResourceData;
  const hasCareTeam = careTeam.length > 0;

  return (
    <Root name="Claim">
      <Header>
        <Title data-testid="title">Claim #{id}</Title>
        {use && <Badge data-testid="use">{use}</Badge>}
        {status && (
          <BadgeSecondary data-testid="status">{status}</BadgeSecondary>
        )}
      </Header>
      <Body>
        <Value label="Type" data-testid="type">
          <Coding fhirData={typeCoding} />
        </Value>
        {created && (
          <Value label="Created at" data-testid="created">
            <DateType fhirData={created} />
          </Value>
        )}
        {priorityCoding && (
          <Value label="Priority" data-testid="priority">
            <Coding fhirData={priorityCoding} />
          </Value>
        )}
        {insurer && (
          <Value label="Insurer" data-testid="insurer">
            <Reference fhirData={insurer} />
          </Value>
        )}
        {organization && (
          <Value label="Organization" data-testid="organization">
            <Reference fhirData={organization} />
          </Value>
        )}
        {payee.coding && (
          <Value label="Payee" data-testid="payee.type">
            <Coding fhirData={payee.coding} />
          </Value>
        )}
        {payee.party && (
          <Value label="Payee party" data-testid="payee.party">
            <Reference fhirData={payee.party} />
          </Value>
        )}
        {hasCareTeam && <CareTeam careTeam={careTeam} />}
      </Body>
    </Root>
  );
};

Claim.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirVersions.DSTU2, fhirVersions.STU3])
    .isRequired,
};

export default Claim;
