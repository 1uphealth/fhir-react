import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import {
  Root,
  Header,
  Title,
  Badge,
  BadgeSecondary,
  Body,
  Value,
  MissingValue,
} from '../../ui';
import Date from '../../datatypes/Date';
import fhirVersions from '../fhirResourceVersions';
import Coding from '../../datatypes/Coding';
import Reference from '../../datatypes/Reference/Reference';
import Attachment from '../../datatypes/Attachment';
import Quantity from '../../datatypes/Quantity';
import './QuestionnaireResponse.css';

const DEFAULT_TITLE = 'Questionnaire Response';

const getQuestionText = item => {
  let text = _get(item, 'text');
  if (!text) {
    // DSTU2
    const groupConcept = _get(item, 'concept.0');
    if (groupConcept) {
      text = <Coding fhirData={groupConcept} />;
    }
    text = text ? text : <MissingValue />;
    // STU3
    const groupCode = _get(item, 'code.0');
    if (!text && groupCode) {
      text = <Coding fhirData={groupCode} />;
    }
  }
  return text;
};

const answerTypes = {
  valueString: value => value,
  valueDecimal: value => value,
  valueInteger: value => value,
  valueDate: value => <Date fhirData={value} />,
  valueDateTime: value => <Date fhirData={value} />,
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
              />,
            );
          }
          return toRender;
        });
      })}
    </div>
  );
};

const Group = props => {
  const { data, prepareItems } = props;
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
          className="fhir-resource__QuestionnaireResponse-list-title"
          data-testid={`linkId-${item.linkId}`}
        >
          {title || <MissingValue />}
        </li>
        {item.isGroup && (
          <li>
            <Group data={item.group} prepareItems={prepareItems} />
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

const Questions = props => {
  const { questions, prepareItems } = props;
  if (!Array.isArray(questions) || questions.length === 0) {
    return null;
  }
  return (
    <ul className="fhir-resource__QuestionnaireResponse-questions-list">
      {questions.map(prepareItems).map((item, i) => {
        const text = getQuestionText(item);
        const hasGroup = item.isGroup;
        const answers = _get(item, 'answer', []);
        return (
          <li key={`item-${i}`} data-testid={`linkId-${item.linkId}`}>
            {text}
            {answers && <Answers data={item.answer} />}
            {hasGroup && (
              <Group data={item.group} prepareItems={prepareItems} />
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

const Items = props => {
  const { fhirVersion, data } = props;
  if (fhirVersion === fhirVersions.DSTU2) {
    const prepareItems = item => {
      return {
        ...item,
        isGroup: !!_get(item, 'group'),
      };
    };

    if (data.isGroup) {
      return <Group data={data.data} prepareItems={prepareItems} />;
    }
    return (
      <Group data={[{ question: data.data }]} prepareItems={prepareItems} />
    );
  }

  if (fhirVersion === fhirVersions.STU3 || fhirVersion === fhirVersions.R4) {
    const prepareItems = item => ({
      ...item,
      group: !!_get(item, 'item') ? _get(item, 'item') : null,
      isGroup: !!_get(item, 'item'),
    });
    return <Group data={[{ question: data }]} prepareItems={prepareItems} />;
  }

  return null;
};

Items.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

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

const QuestionnaireResponse = props => {
  const { fhirResource, fhirVersion } = props;
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

  return (
    <Root name="Questionnaire">
      <Header>
        <Title>{title || DEFAULT_TITLE}</Title>
        {status && <Badge data-testid="status">{status}</Badge>}
        {dateTime && (
          <BadgeSecondary data-testid="dateTime">
            <Date fhirData={dateTime} />
          </BadgeSecondary>
        )}
      </Header>
      <Body>
        {subject && (
          <Value label="Subject" data-testid="subject">
            <Reference fhirData={subject} />
          </Value>
        )}
        {author && (
          <Value label="Author" data-testid="author">
            <Reference fhirData={author} />
          </Value>
        )}
        {rootItems && (
          <div className="overflow-auto">
            <Items fhirVersion={fhirVersion} data={rootItems} />
          </div>
        )}
      </Body>
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
