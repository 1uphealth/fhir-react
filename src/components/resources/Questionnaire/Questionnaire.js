import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import { Root, Header, Title, Badge, BadgeSecondary, Body } from '../../ui';
import Date from '../../datatypes/Date';
import Coding from '../../datatypes/Coding';

import './Questionnaire.css';
import Reference from '../../datatypes/Reference/Reference';
import fhirVersions from '../fhirResourceVersions';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';

let prepareItems;

const getQuestionText = item => {
  let text = _get(item, 'text');
  if (!text) {
    // DSTU2
    const groupConcept = _get(item, 'concept.0');
    if (groupConcept) {
      text = <Coding fhirData={groupConcept} />;
    }
    // STU3
    const groupCode = _get(item, 'code.0');
    if (!text && groupCode) {
      text = <Coding fhirData={groupCode} />;
    }
  }
  return text;
};

const renderQuestions = questions => {
  if (!Array.isArray(questions) || questions.length === 0) {
    return null;
  }

  return (
    <ul className="fhir-resource__Questionnaire-questions-list">
      {questions.map((item, i) => {
        const hasLinkId = item.linkId;
        let type = _get(item, 'type');
        if (type === 'group') {
          type = '';
        }
        const options = _get(item, 'options');

        const text = getQuestionText(item);
        const hasDetails = type || options;
        return (
          <li key={`item-${i}`} data-testid={`linkId-${item.linkId}`}>
            {hasLinkId && <Badge>{item.linkId}</Badge>}
            {text}
            {hasDetails && (
              <div className="fhir-resource__Questionnaire-questions-list-item-details">
                {type && (
                  <div className="fhir-resource__Questionnaire-questions-list-item-details-el">
                    Type: {type}
                  </div>
                )}
                {options && (
                  <div className="fhir-resource__Questionnaire-questions-list-item-details-el">
                    Options: <Reference fhirData={options} />
                  </div>
                )}
              </div>
            )}
            {item.item && renderGroup(item.item)}
          </li>
        );
      })}
    </ul>
  );
};

const renderGroup = data => {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return data.map(prepareItems).map((item, i) => {
    const linkId = _get(item, 'linkId', '');

    const text = getQuestionText(item);
    let nestedItems = _get(item, 'item', []);
    nestedItems = nestedItems.map(prepareItems);
    const isGroup = _get(item, 'isGroup');
    return (
      <ul key={`item-${i}`} className="fhir-resource__Questionnaire-list">
        <li
          className="fhir-resource__Questionnaire-list-title"
          data-testid={`linkId-${item.linkId}`}
        >
          <Badge>{linkId}</Badge>
          <span>{text}</span>
        </li>
        {!isGroup && <li>{renderQuestions(nestedItems)}</li>}
        {isGroup && <li>{renderGroup(nestedItems)}</li>}
      </ul>
    );
  });
};

const renderItems = fhirVersion => data => {
  if (fhirVersion === fhirVersions.DSTU2) {
    prepareItems = item => ({
      ...item,
      item: _get(item, 'question') || _get(item, 'group') || [],
      isGroup: !!_get(item, 'group'),
    });
    return renderGroup(data);
  }

  if (fhirVersion === fhirVersions.STU3) {
    prepareItems = item => ({
      ...item,
      isGroup: _get(item, 'type') === 'group',
    });
    return renderGroup(data);
  }

  return null;
};

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

const Questionnaire = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};

  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="Questionnaire" />;
  }
  const { title, status, dateTime, rootItems } = fhirResourceData;
  const renderQuestionnaireItems = renderItems(fhirVersion);
  return (
    <Root name="Questionnaire">
      <Header>
        <Title>{title}</Title>
        {status && <Badge data-testid="status">{status}</Badge>}
        {dateTime && (
          <BadgeSecondary data-testid="dateTime">
            <Date fhirData={dateTime} />
          </BadgeSecondary>
        )}
      </Header>
      <Body>
        {rootItems && <div>{renderQuestionnaireItems(rootItems)}</div>}
      </Body>
    </Root>
  );
};

Questionnaire.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirVersions.DSTU2, fhirVersions.STU3])
    .isRequired,
};

export default Questionnaire;
