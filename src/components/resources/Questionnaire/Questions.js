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
        const text = getQuestionText(item);
        return (
          text && (
            <li key={`item-${i}`} data-testid={`linkId-${item.linkId}`}>
              <div className="fhir-resource__Questionnaire-questions-list-element">
                {text}
              </div>
              {item.item && item.item.length > 0 && (
                <Group data={item.item} prepareItems={prepareItems} isChild />
              )}
            </li>
          )
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
