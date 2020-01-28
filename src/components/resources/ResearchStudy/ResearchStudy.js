import React from 'react';
import PropTypes from 'prop-types';

import CodeableConcept from '../../datatypes/CodeableConcept';
import Coding from '../../datatypes/Coding';
import DateType from '../../datatypes/Date';
import Reference from '../../datatypes/Reference';
import Telecom from '../../datatypes/Telecom';

import _get from 'lodash/get';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';

import {
  Badge,
  BadgeSecondary,
  Body,
  Header,
  MissingValue,
  Root,
  Title,
  Value,
} from '../../ui';

const commonDTO = fhirResource => {
  const title = _get(fhirResource, 'title');
  const status = _get(fhirResource, 'status');
  const categoryCoding = _get(fhirResource, 'category[0].coding[0]');
  const focusCoding = _get(fhirResource, 'focus[0].coding[0]');
  const protocolReference = _get(fhirResource, 'protocol');
  const partOfReference = _get(fhirResource, 'partOf');
  const contacts = _get(fhirResource, 'contact', []).map(contact => {
    const name = _get(contact, 'name');
    const telecoms = _get(contact, 'telecom');
    return { name, telecoms };
  });
  const keywordConcepts = _get(fhirResource, 'keyword', []);
  const period = _get(fhirResource, 'period', {});
  const enrollmentReferences = _get(fhirResource, 'enrollment', []);
  const sponsorReference = _get(fhirResource, 'sponsor');
  const principalInvestigatorReference = _get(
    fhirResource,
    'principalInvestigator',
  );
  const siteReferences = _get(fhirResource, 'site', []);

  return {
    title,
    status,
    categoryCoding,
    focusCoding,
    protocolReference,
    partOfReference,
    contacts,
    keywordConcepts,
    period,
    enrollmentReferences,
    sponsorReference,
    principalInvestigatorReference,
    siteReferences,
  };
};
const resourceDTO = (fhirVersion, fhirResource) => {
  return commonDTO(fhirResource);
};

const ResearchStudy = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="ResearchStudy" />;
  }
  const {
    title,
    status,
    categoryCoding,
    focusCoding,
    protocolReference,
    partOfReference,
    contacts,
    keywordConcepts,
    period,
    enrollmentReferences,
    sponsorReference,
    principalInvestigatorReference,
    siteReferences,
  } = fhirResourceData;

  const hasContacts = contacts.length > 0;
  const hasKeywords = keywordConcepts.length > 0;
  const hasPeriod = period.start || period.end;
  const hasEnrollment = enrollmentReferences.length > 0;
  const hasSites = siteReferences.length > 0;

  return (
    <Root name="ResearchStudy">
      <Header>
        {title && <Title data-testid="title">{title}</Title>}
        <Badge data-testid="status">{status}</Badge>
        {hasPeriod && (
          <BadgeSecondary data-testid="period">
            {period.start ? (
              <DateType fhirData={period.start} />
            ) : (
              <MissingValue />
            )}
            {' - '}
            {period.end ? <DateType fhirData={period.end} /> : <MissingValue />}
          </BadgeSecondary>
        )}
      </Header>
      <Body>
        {categoryCoding && (
          <Value label="Category" data-testid="category">
            <Coding fhirData={categoryCoding} />
          </Value>
        )}
        {focusCoding && (
          <Value label="Focus" data-testid="focus">
            <Coding fhirData={focusCoding} />
          </Value>
        )}
        {protocolReference && (
          <Value label="Protocol" data-testid="protocol">
            <Reference fhirData={protocolReference} />
          </Value>
        )}
        {partOfReference && (
          <Value label="Part of study" data-testid="partOf">
            <Reference fhirData={partOfReference} />
          </Value>
        )}
        {hasContacts && (
          <Value label="Contacts" data-testid="contacts">
            {contacts.map((contact, idx) => (
              <div key={idx}>
                <div data-testid="contactsName">{contact.name}</div>
                <div data-testid="contactsTelecom">
                  <Telecom fhirData={contact.telecoms} />
                </div>
              </div>
            ))}
          </Value>
        )}
        {hasKeywords && (
          <Value label="Keywords" data-testid="keywords">
            <CodeableConcept fhirData={keywordConcepts} />
          </Value>
        )}
        {hasEnrollment && (
          <Value label="Enrollment" data-testid="enrollment">
            {enrollmentReferences.map((enrollmentReference, idx) => (
              <div key={idx} data-testid="enrollmentReference">
                <Reference fhirData={enrollmentReference} />
              </div>
            ))}
          </Value>
        )}
        {sponsorReference && (
          <Value label="Sponsor" data-testid="sponsor">
            <Reference fhirData={sponsorReference} />
          </Value>
        )}
        {principalInvestigatorReference && (
          <Value
            label="Principal investigator"
            data-testid="principalInvestigator"
          >
            <Reference fhirData={principalInvestigatorReference} />
          </Value>
        )}
        {hasSites && (
          <Value label="Sites" data-testid="sites">
            {siteReferences.map((siteReference, idx) => (
              <div key={idx} data-testid="siteReference">
                <Reference fhirData={siteReference} />
              </div>
            ))}
          </Value>
        )}
      </Body>
    </Root>
  );
};

ResearchStudy.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirVersions.STU3]),
};

export default ResearchStudy;
