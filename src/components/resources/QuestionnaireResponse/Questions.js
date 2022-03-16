import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import Group from './Group';
import Answers from './Answers';
import { getQuestionText } from './getQuestionText';

const Questions = ({ questions, prepareItems }) => {
  if (!Array.isArray(questions) || questions.length === 0) {
    return null;
  }

  console.log({ questions });

  return (
    <ul className="fhir-resource__QuestionnaireResponse-questions-list">
      {questions.map(prepareItems).map((item, i) => {
        const text = getQuestionText(item);
        const hasGroup = item.isGroup;
        const answers = _get(item, 'answer', []);
        return (
          <li key={`item-${i}`} data-testid={`linkId-${item.linkId}`}>
            <div className="fhir-resource__QuestionnaireResponse-questions-list-element">
              {text}
            </div>
            {answers && <Answers data={item.answer} />}
            {hasGroup && (
              <Group data={item.group} prepareItems={prepareItems} isChild />
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
