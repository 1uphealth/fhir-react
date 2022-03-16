import Date from '../../datatypes/Date';
import Coding from '../../datatypes/Coding';
import Attachment from '../../datatypes/Attachment';
import Quantity from '../../datatypes/Quantity';
import _get from 'lodash/get';
import React from 'react';
import Group from './Group';

const answerTypes = {
  valueString: value => value,
  valueDecimal: value => value,
  valueInteger: value => value,
  valueDate: value => <Date fhirData={value} isBlack />,
  valueDateTime: value => <Date fhirData={value} isBlack />,
  valueCoding: value => <Coding fhirData={value} />,
  valueAttachment: value => <Attachment fhirData={value} />,
  valueQuantity: value => <Quantity fhirData={value} />,
  valueBoolean: value => (value ? 'Yes' : 'No'),
};

const Answers = props => {
  const { data, prepareItems } = props;
  if (!Array.isArray(data)) {
    return null;
  }
  return (
    <div className="fhir-resource__QuestionnaireResponse-questions-list-item-details">
      {data.map(answer => {
        return Object.keys(answer).map((answerKey, i) => {
          const toRender = [];
          if (typeof answerTypes[answerKey] === 'function') {
            toRender.push(
              <div
                key={`item-${i}`}
                className="fhir-resource__QuestionnaireResponse-questions-list-item-details-el"
                data-testid={`${props['data-testid']}-${i}`}
              >
                {answerTypes[answerKey](answer[answerKey])}{' '}
              </div>,
            );
          }
          if (_get(answer, 'item')) {
            toRender.push(
              <Group
                key={`item-answer-${i}`}
                data={answer.item}
                prepareItems={prepareItems}
                isChild
              />,
            );
          }
          return toRender;
        });
      })}
    </div>
  );
};

export default Answers;
