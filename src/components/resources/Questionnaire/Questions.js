import _get from 'lodash/get';
import { Badge } from '../../ui';
import Reference from '../../datatypes/Reference';
import PropTypes from 'prop-types';
import React from 'react';
import Group from './Group';
import { getQuestionText } from './getQuestionText';

const Questions = ({ questions, prepareItems }) => {
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
            {item.item && (
              <Group data={item.item} prepareItems={prepareItems} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

Questions.propTypes = {
  questions: PropTypes.array,
  prepareItems: PropTypes.func.isRequired,
};

export default Questions;
