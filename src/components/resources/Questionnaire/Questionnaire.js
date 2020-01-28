import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import { Root, Header, Title, Badge, BadgeSecondary, Body } from '../../ui';
import Date from '../../datatypes/Date';
import Coding from '../../datatypes/Coding';

import './Questionnaire.css';
import Reference from '../../datatypes/Reference/Reference';

const renderQuestions = questions => {
  if (!Array.isArray(questions) || questions.length === 0) {
    return null;
  }

  return (
    <ul className="fhir-resource__Questionnaire-questions-list">
      {questions.map((item, i) => {
        const hasLinkId = item.linkId;
        const type = _get(item, 'type');
        const options = _get(item, 'options');
        let text = item.text;
        if (!text) {
          const groupConcept = _get(item, 'concept.0');
          if (groupConcept) {
            text = <Coding fhirData={groupConcept} />;
          }
        }
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
            {item.group && renderGroup(item.group)}
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

  return data.map((item, i) => {
    const linkId = _get(item, 'linkId', '');
    let text = _get(item, 'text');
    if (!text) {
      const groupConcept = _get(item, 'concept.0');
      if (groupConcept) {
        text = <Coding fhirData={groupConcept} />;
      }
    }
    const questions = _get(item, 'question');
    const group = _get(item, 'group');
    return (
      <ul key={`item-${i}`} className="fhir-resource__Questionnaire-list">
        <li
          className="fhir-resource__Questionnaire-list-title"
          data-testid={`linkId-${item.linkId}`}
        >
          <Badge>{linkId}</Badge>
          <span>{text}</span>
        </li>
        {questions && <li>{renderQuestions(questions)}</li>}
        {group && <li>{renderGroup(group)}</li>}
      </ul>
    );
  });
};

const Questionnaire = props => {
  const { fhirResource } = props;

  let title = _get(fhirResource, 'group.title');
  if (!title) {
    const groupConcept = _get(fhirResource, 'group.concept.0');
    if (groupConcept) {
      title = <Coding fhirData={groupConcept} />;
    }
  }
  const status = _get(fhirResource, 'status');
  const dateTime = _get(fhirResource, 'date');

  const rootGroup = _get(fhirResource, 'group.group');
  const rootQuestion = _get(fhirResource, 'group.question');
  const showDataTable = rootGroup || rootQuestion;
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
        {showDataTable && <div>{rootGroup && renderGroup(rootGroup)}</div>}
      </Body>
    </Root>
  );
};

Questionnaire.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Questionnaire;
