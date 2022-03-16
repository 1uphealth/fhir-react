import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import { Root, Header, Badge, Body, Value } from '../../ui';
import Date from '../../datatypes/Date';
import Coding from '../../datatypes/Coding';

import './Questionnaire.css';
import fhirVersions from '../fhirResourceVersions';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import Items from './Items';
import Accordion from '../../containers/Accordion';

const commonDTO = fhirResource => {
  const status = _get(fhirResource, 'status');
  const dateTime = _get(fhirResource, 'date');

  return { status, dateTime };
};

const dstu2DTO = fhirResource => {
  let title = _get(fhirResource, 'group.title');
  if (!title) {
    const groupConcept = _get(fhirResource, 'group.concept.0');
    if (groupConcept) {
      title = <Coding fhirData={groupConcept} />;
    }
  }
  const rootItems =
    _get(fhirResource, 'group.group') ||
    _get(fhirResource, 'group.question') ||
    [];
  return {
    title,
    rootItems,
  };
};

const stu3DTO = fhirResource => {
  let title = _get(fhirResource, 'title');
  if (!title) {
    const groupConcept = _get(fhirResource, 'code.0');
    if (groupConcept) {
      title = <Coding fhirData={groupConcept} />;
    }
  }

  const rootItems = _get(fhirResource, 'item');
  return {
    title,
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
    // STU3 and R4 can use the same function
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

const Questionnaire = ({ fhirResource, fhirVersion, fhirIcons }) => {
  let fhirResourceData = {};

  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="Questionnaire" />;
  }
  const { title, status, dateTime, rootItems } = fhirResourceData;

  return (
    <Root name="Questionnaire">
      <Accordion
        headerContent={
          <Header
            resourceName="Questionnaire"
            title={title}
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
          <Body>
            {rootItems && (
              <div className="overflow-auto">
                <Items fhirVersion={fhirVersion} data={rootItems} />
              </div>
            )}
          </Body>
        }
      />
    </Root>
  );
};

Questionnaire.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

export default Questionnaire;
