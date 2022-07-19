import React from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';

import Accordion from '../../containers/Accordion';
import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';
import Date from '../../datatypes/Date';
import Annotation from '../../datatypes/Annotation';

import { Root, Header, Badge, BadgeSecondary, Body } from '../../ui';
import CodeableConcept from '../../datatypes/CodeableConcept';
import { getResourceDate } from '../../../utils/getResourceDate';

const commonDTO = fhirResource => {
  const hasReaction = _get(fhirResource, 'reaction.0.manifestation');
  const reaction = _get(fhirResource, 'reaction', []);
  const asserter = _get(fhirResource, 'asserter');
  const type = _get(fhirResource, 'type');
  const category = _get(fhirResource, 'category');
  const patient = _get(fhirResource, 'patient');

  return {
    hasReaction,
    reaction,
    asserter,
    type,
    category,
    patient,
  };
};

const dstu2DTO = fhirResource => {
  const title =
    _get(fhirResource, 'substance.coding[0].display') ||
    _get(fhirResource, 'substance.text', '');
  const status = _get(fhirResource, 'status', '');
  const recordedDate = _get(fhirResource, 'recordedDate');
  const substanceCoding = _get(fhirResource, 'substance.coding');
  const hasSubstanceCoding = Array.isArray(substanceCoding);
  const asserter = _get(fhirResource, 'reporter');

  return {
    title,
    status,
    recordedDate,
    substanceCoding,
    hasSubstanceCoding,
    asserter,
  };
};

const stu3DTO = fhirResource => {
  const title = _get(fhirResource, 'code.coding.0.display');
  const status = _get(fhirResource, 'verificationStatus');
  const recordedDate = _get(fhirResource, 'assertedDate');
  let substanceCoding = _get(fhirResource, 'reaction', []).filter(item =>
    _get(item, 'substance.coding'),
  );
  substanceCoding = _get(substanceCoding, '0.substance.coding');
  const hasSubstanceCoding =
    Array.isArray(substanceCoding) && substanceCoding.length > 0;
  const note = _get(fhirResource, 'note');
  const hasNote = Array.isArray(note);
  return {
    title,
    status,
    recordedDate,
    substanceCoding,
    hasSubstanceCoding,
    note,
    hasNote,
  };
};

const r4DTO = fhirResource => {
  const title = _get(fhirResource, 'code.coding.0.display');
  const status = _get(fhirResource, 'verificationStatus.coding[0].display');
  const recordedDate = _get(fhirResource, 'recordedDate');
  let substanceCoding = _get(fhirResource, 'reaction', []).filter(item =>
    _get(item, 'substance.coding'),
  );
  substanceCoding = _get(substanceCoding, '0.substance.coding');
  const hasSubstanceCoding =
    Array.isArray(substanceCoding) && substanceCoding.length > 0;
  const note = _get(fhirResource, 'note');
  const hasNote = Array.isArray(note);

  return {
    title,
    status,
    recordedDate,
    substanceCoding,
    hasSubstanceCoding,
    note,
    hasNote,
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

const AllergyIntolerance = ({
  fhirResource,
  fhirVersion,
  fhirIcons,
  onClick,
  rawOnClick,
  customId,
}) => {
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="AllergyIntolerance" />;
  }

  const {
    title,
    status,
    recordedDate,
    substanceCoding,
    hasSubstanceCoding,
    hasReaction,
    reaction,
    asserter,
    hasNote,
    note,
    type,
    category,
    patient,
  } = fhirResourceData;

  const tableData = [
    {
      label: 'Substance',
      testId: 'substance',
      data:
        hasSubstanceCoding &&
        substanceCoding.map((item, i) => (
          <Coding key={`item-${i}`} fhirData={item} />
        )),
      status: hasSubstanceCoding,
    },
    {
      label: 'Type',
      testId: 'type',
      data: type,
      status: type,
    },
    {
      label: 'Category',
      testId: 'category',
      data: category,
      status: category,
    },
    {
      label: 'Patient',
      testId: 'patient',
      data: <Reference fhirData={patient} />,
      status: patient,
    },
    {
      label: 'Asserted by',
      testId: 'asserter',
      data: asserter && <Reference fhirData={asserter} />,
      status: asserter,
    },
    {
      label: 'Manifestation',
      testId: 'manifestation',
      data: reaction.map((reaction, i) => {
        const manifestations = _get(reaction, 'manifestation', []);
        const severity = _get(reaction, 'severity');
        return manifestations.map((manifestation, j) => {
          return (
            <div key={`item-${i}${j}`} className="d-flex">
              <CodeableConcept fhirData={manifestation} />
              {severity && (
                <span className="ms-4">
                  <BadgeSecondary>{severity}</BadgeSecondary>
                </span>
              )}
            </div>
          );
        });
      }),
      status: hasReaction,
    },
    {
      label: 'Notes',
      testId: 'hasNote',
      data: hasNote && <Annotation fhirData={note} />,
      status: hasNote,
    },
  ];

  const allergyDatesPaths = [
    'meta.lastUpdated',
    'onsetPeriod.start',
    'onset',
    'reaction[0].onset',
    'recordedDate',
    'onsetDateTime',
    'assertedDate',
  ];

  const headerDate =
    getResourceDate(fhirResource, allergyDatesPaths) || recordedDate;

  return (
    <Root name="AllergyIntolerance">
      <Accordion
        headerContent={
          <Header
            resourceName="AllergyIntolerance"
            badges={status && <Badge data-testid="status">{status}</Badge>}
            title={title}
            icon={fhirIcons}
            rightAdditionalContent={
              headerDate && (
                <BadgeSecondary data-testid="recordedDate">
                  recorded on&nbsp;
                  <Date fhirData={headerDate} />
                </BadgeSecondary>
              )
            }
          />
        }
        bodyContent={<Body tableData={tableData} />}
        onClick={onClick}
        rawOnClick={rawOnClick}
        customId={customId}
      />
    </Root>
  );
};

AllergyIntolerance.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]),
};

export default AllergyIntolerance;
