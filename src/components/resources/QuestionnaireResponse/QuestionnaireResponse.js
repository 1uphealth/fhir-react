import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import { Root, Header, Badge, Body, Value } from '../../ui';
import Date from '../../datatypes/Date';
import fhirVersions from '../fhirResourceVersions';
import Coding from '../../datatypes/Coding';
import Reference from '../../datatypes/Reference/Reference';
import './QuestionnaireResponse.css';
import Accordion from '../../containers/Accordion';
import Items from './Items';

const DEFAULT_TITLE = 'Questionnaire Response';

const commonDTO = fhirResource => {
  const status = _get(fhirResource, 'status');
  const dateTime = _get(fhirResource, 'authored');
  const subject = _get(fhirResource, 'subject');
  const author = _get(fhirResource, 'author');
  return { status, dateTime, subject, author };
};

const dstu2DTO = fhirResource => {
  let title = _get(fhirResource, 'group.title');
  if (!title) {
    const groupConcept = _get(fhirResource, 'group.concept.0');
    if (groupConcept) {
      title = <Coding fhirData={groupConcept} />;
    }
  }
  const rootItems = {
    isGroup: !!_get(fhirResource, 'group.group'),
    data:
      _get(fhirResource, 'group.group') ||
      _get(fhirResource, 'group.question') ||
      [],
  };
  return {
    title,
    rootItems,
  };
};

const stu3DTO = fhirResource => {
  const rootItems = _get(fhirResource, 'item');
  return {
    rootItems,
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
    // Same for STU3 and R4
    case fhirVersions.STU3:
    case fhirVersions.R4: {
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
      };
    }

    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const QuestionnaireResponse = ({
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
    return (
      <UnhandledResourceDataStructure resourceName="QuestionnaireResponse" />
    );
  }
  const {
    title,
    status,
    dateTime,
    subject,
    author,
    rootItems,
  } = fhirResourceData;

  const tableData = [
    {
      label: 'Subject',
      testId: 'subject',
      data: subject && <Reference fhirData={subject} />,
      status: subject,
    },
    {
      label: 'Author',
      testId: 'author',
      data: author && <Reference fhirData={author} />,
      status: author,
    },
  ];

  return (
    <Root name="QuestionnaireResponse">
      <Accordion
        headerContent={
          <Header
            resourceName="QuestionnaireResponse"
            title={title || DEFAULT_TITLE}
            badges={status && <Badge data-testid="status">{status}</Badge>}
            additionalContent={
              dateTime && (
                <Value label="On" data-testid="dateTime">
                  <Date fhirData={dateTime} isBlack />
                </Value>
              )
            }
            icon={fhirIcons}
          />
        }
        bodyContent={
          <Body tableData={tableData}>
            {rootItems && (
              <div className="overflow-auto">
                <Items fhirVersion={fhirVersion} data={rootItems} />
              </div>
            )}
          </Body>
        }
        onClick={onClick}
        rawOnClick={rawOnClick}
      />
    </Root>
  );
};

QuestionnaireResponse.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

export default QuestionnaireResponse;
