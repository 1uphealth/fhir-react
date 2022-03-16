import _get from 'lodash/get';
import { MissingValue } from '../../ui';
import PropTypes from 'prop-types';
import React from 'react';
import Answers from './Answers';
import Questions from './Questions';

const Group = ({ data, prepareItems, isChild = false }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return data.map(prepareItems).map((item, i) => {
    const title =
      _get(item, 'title') ||
      _get(item, 'text') ||
      _get(item, '_linkId.fhir_comments.0');

    return (
      <ul
        key={`item-${i}`}
        className="fhir-resource__QuestionnaireResponse-list"
      >
        <li
          className={
            isChild
              ? 'fhir-resource__QuestionnaireResponse-list-title-question'
              : 'fhir-resource__QuestionnaireResponse-list-title'
          }
          data-testid={`linkId-${item.linkId}`}
        >
          {title || <MissingValue />}
        </li>
        {item.isGroup && (
          <li>
            <Group data={item.group} prepareItems={prepareItems} isChild />
          </li>
        )}
        {!item.isGroup && (
          <>
            {item.question && (
              <li>
                <Questions
                  questions={item.question}
                  prepareItems={prepareItems}
                />
              </li>
            )}
            {item.answer && (
              <li>
                <Answers
                  data={item.answer}
                  prepareItems={prepareItems}
                  data-testid={`answer-${item.linkId}`}
                />
              </li>
            )}
          </>
        )}
      </ul>
    );
  });
};

Group.propTypes = {
  data: PropTypes.array,
  prepareItems: PropTypes.func.isRequired,
};

export default Group;
