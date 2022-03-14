import React from 'react';
import PropTypes from 'prop-types';

import Annotation from '../../datatypes/Annotation';
import CodeableConcept from '../../datatypes/CodeableConcept';
import Coding from '../../datatypes/Coding';
import DateType from '../../datatypes/Date';
import Markdown from '../../datatypes/Markdown';
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
import Accordion from '../../containers/Accordion';

const commonDTO = fhirResource => {
  const title = _get(fhirResource, 'title', 'Research Study');
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
  const comments = _get(fhirResource, 'note', []);
  const description = _get(fhirResource, 'description');
  const arms = _get(fhirResource, 'arm', []).map(arm => {
    const name = _get(arm, 'name');
    const description = _get(arm, 'description');
    const coding = _get(arm, 'code.coding[0]');
    return { name, description, coding };
  });

  return {
    title,
    status,
    description,
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
    comments,
    arms,
  };
};

const r4DTO = fhirResource => {
  const location = _get(fhirResource, 'location');
  const primaryPurposeType = _get(fhirResource, 'primaryPurposeType');
  return {
    location,
    primaryPurposeType,
  };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
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
    default: {
      throw Error('Unrecognized the fhir version property type.');
    }
  }
};

const ResearchStudy = ({ fhirResource, fhirVersion, fhirIcons }) => {
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
    comments,
    description,
    arms,
    location,
    primaryPurposeType,
  } = fhirResourceData;

  const hasContacts = contacts.length > 0;
  const hasKeywords = keywordConcepts.length > 0;
  const hasPeriod = period.start || period.end;
  const hasEnrollment = enrollmentReferences.length > 0;
  const hasSites = siteReferences.length > 0;
  const hasComments = comments.length > 0;
  const hasArms = arms.length > 0;

  const tableData = [
    {
      label: 'Part of another study',
      testId: 'partOf',
      data: partOfReference && <Reference fhirData={partOfReference} />,
      status: partOfReference,
    },
    {
      label: 'Category',
      testId: 'category',
      data: categoryCoding && <Coding fhirData={categoryCoding} />,
      status: categoryCoding,
    },
    {
      label: 'Keywords',
      testId: 'keywords',
      data: hasKeywords && <CodeableConcept fhirData={keywordConcepts} />,
      status: hasKeywords,
    },
    {
      label: 'Description',
      testId: 'description',
      data: description && <Markdown fhirData={description} />, // TODO: list here has to big spacing?
      status: description,
    },
    {
      label: 'Focus',
      testId: 'focus',
      data: focusCoding && <Coding fhirData={focusCoding} />,
      status: focusCoding,
    },
    {
      label: 'Enrollment',
      testId: 'enrollment',
      data:
        hasEnrollment &&
        enrollmentReferences.map((enrollmentReference, idx) => (
          <div key={idx} data-testid="enrollmentReference">
            <Reference fhirData={enrollmentReference} />
          </div>
        )),
      status: hasEnrollment,
    },
    {
      label: 'Protocol',
      testId: 'protocol',
      data: protocolReference && <Reference fhirData={protocolReference} />,
      status: protocolReference,
    },
    {
      label: 'Study paths',
      testId: 'arms',
      data: hasArms && (
        <ul>
          {arms.map((arm, idx) => (
            <li key={idx}>
              <div data-testid="arms.name">{arm.name}</div>
              <Coding fhirData={arm.coding} />
              <div data-testid="arms.description">{arm.description}</div>
            </li>
          ))}
        </ul>
      ),
      status: hasArms,
    },
    {
      label: 'Comments',
      testId: 'comments',
      data: hasComments && <Annotation fhirData={comments} />,
      status: hasComments,
    },
    {
      label: 'Contacts',
      testId: 'contacts',
      data:
        hasContacts &&
        contacts.map((contact, idx) => (
          <div key={idx}>
            <div data-testid="contactsName">{contact.name}</div>
            <div data-testid="contactsTelecom">
              <Telecom fhirData={contact.telecoms} />
            </div>
          </div>
        )),
      status: hasContacts,
    },
    {
      label: 'Principal investigator',
      testId: 'principalInvestigator',
      data: principalInvestigatorReference && (
        <Reference fhirData={principalInvestigatorReference} />
      ),
      status: principalInvestigatorReference,
    },
    {
      label: 'Sponsor',
      testId: 'sponsor',
      data: sponsorReference && <Reference fhirData={sponsorReference} />,
      status: sponsorReference,
    },
    {
      label: 'Sites',
      testId: 'sites',
      data:
        hasSites &&
        siteReferences.map((siteReference, idx) => (
          <div key={idx} data-testid="siteReference">
            <Reference fhirData={siteReference} />
          </div>
        )),
      status: hasSites,
    },
    {
      label: 'Location',
      testId: 'location',
      data: location && <CodeableConcept fhirData={location} />,
      status: location,
    },
    {
      label: 'Primary Purpose Type',
      testId: 'primaryPurposeType',
      data: primaryPurposeType && (
        <CodeableConcept fhirData={primaryPurposeType} />
      ),
      status: primaryPurposeType,
    },
  ];

  return (
    <Root name="ResearchStudy">
      <Accordion
        headerContent={
          <Header
            resourceName="ResearchStudy"
            title={title}
            badges={
              <>
                {status && <Badge data-testid="status">{status}</Badge>}
                {hasPeriod && (
                  <BadgeSecondary data-testid="period">
                    {period.start ? (
                      <DateType fhirData={period.start} />
                    ) : (
                      <MissingValue />
                    )}
                    {' - '}
                    {period.end ? (
                      <DateType fhirData={period.end} />
                    ) : (
                      <MissingValue />
                    )}
                  </BadgeSecondary>
                )}
              </>
            }
            icon={fhirIcons}
          />
        }
        bodyContent={<Body tableData={tableData} />}
      />
    </Root>
  );
};

ResearchStudy.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirVersions.STU3, fhirVersions.R4]),
};

export default ResearchStudy;
