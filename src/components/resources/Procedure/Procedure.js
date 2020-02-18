import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _has from 'lodash/has';

import Annotation from '../../datatypes/Annotation';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import Reference from '../../datatypes/Reference';
import CodeableConcept from '../../datatypes/CodeableConcept';
import {
  Root,
  Header,
  Title,
  Body,
  Value,
  Badge,
  BadgeSecondary,
  MissingValue,
} from '../../ui';

const Procedure = props => {
  const { fhirResource } = props;
  const display =
    _get(fhirResource, 'code.coding[0].display') ||
    _get(fhirResource, 'code.text');
  const status = _get(fhirResource, 'status', '');
  const hasPerformedDateTime = _has(fhirResource, 'performedDateTime');
  const performedDateTime = _get(fhirResource, 'performedDateTime');
  const performedPeriodStart = _get(fhirResource, 'performedPeriod.start');
  const performedPeriodEnd = _get(fhirResource, 'performedPeriod.end');
  const hasPerformedPeriod = performedPeriodStart || performedPeriodEnd;
  const hasCoding = _has(fhirResource, 'code.coding');
  const coding = _get(fhirResource, 'code.coding', []);
  const category = _get(fhirResource, 'category.coding[0]');
  const locationReference = _get(fhirResource, 'location');
  const hasPerformerData = _has(fhirResource, 'performer.0.actor.display');
  const performer = _get(fhirResource, 'performer', []);
  const hasReasonCode = _has(fhirResource, 'reasonCode');
  const reasonCode = _get(fhirResource, 'reasonCode', []);
  const hasNote = _has(fhirResource, 'note');
  const note = _get(fhirResource, 'note', []);
  const outcome = _get(fhirResource, 'outcome');
  const hasOutcome = Array.isArray(outcome) && outcome.length > 0;
  return (
    <Root name="Procedure">
      <Header>
        {display && <Title>{display}</Title>}
        <Badge data-testid="status">{status}</Badge>
        {hasPerformedDateTime && (
          <BadgeSecondary data-testid="performedDateTime">
            on <Date fhirData={performedDateTime} />
          </BadgeSecondary>
        )}
        {hasPerformedPeriod && (
          <BadgeSecondary>
            {'performed '}
            {performedPeriodStart ? (
              <Date fhirData={performedPeriodStart} />
            ) : (
              <MissingValue />
            )}
            {' to '}
            {performedPeriodEnd ? (
              <Date fhirData={performedPeriodEnd} />
            ) : (
              <MissingValue />
            )}
          </BadgeSecondary>
        )}
      </Header>
      <Body>
        {hasCoding && (
          <Value label="Identification" data-testid="hasCoding">
            {coding.map((coding, i) => (
              <Coding key={`item-${i}`} fhirData={coding} />
            ))}
          </Value>
        )}
        {category && (
          <Value label="Category" data-testid="category">
            <Coding fhirData={category} />
          </Value>
        )}
        {hasPerformerData && (
          <Value label="Performed the procedure">
            {performer.map((item, i) => (
              <div key={`item-${i}`}>
                {_get(item, 'actor.display', <MissingValue />)}
              </div>
            ))}
          </Value>
        )}
        {hasReasonCode && (
          <Value label="Reason procedure performed" data-testid="hasReasonCode">
            <Annotation fhirData={reasonCode} />
          </Value>
        )}
        {locationReference && (
          <Value label="Location" data-testid="location">
            <Reference fhirData={locationReference} />
          </Value>
        )}
        {hasNote && (
          <Value
            label="Additional information about the procedure"
            data-testid="hasNote"
          >
            <Annotation fhirData={note} />
          </Value>
        )}
        {hasOutcome && (
          <Value label="The result of procedure">
            <CodeableConcept fhirData={outcome} />
          </Value>
        )}
      </Body>
    </Root>
  );
};

Procedure.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Procedure;
