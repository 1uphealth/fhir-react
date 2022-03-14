import _get from 'lodash/get';
import { Badge, MissingValue } from '../../ui';
import PropTypes from 'prop-types';
import React from 'react';
import Questions from './Questions';
import { getQuestionText } from './getQuestionText';

const Group = ({ data, prepareItems }) => {
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
          {text ? text : <MissingValue />}
          {/* TODO: make bold */}
        </li>
        {!isGroup && (
          <li>
            {<Questions questions={nestedItems} prepareItems={prepareItems} />}
          </li>
        )}
        {isGroup && (
          <li>
            <Group data={nestedItems} prepareItems={prepareItems} />
          </li>
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
