import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _has from 'lodash/has';

import Coding from '../../datatypes/Coding';
import Annotation from '../../datatypes/Annotation';
import Date from '../../datatypes/Date';
import {
  Root,
  Header,
  Title,
  Body,
  Value,
  Badge,
  BadgeSecoundary,
} from '../../ui';

const Procedure = props => {
  const { fhirResource } = props;
  const display =
    _get(fhirResource, 'code.coding[0].display') ||
    _get(fhirResource, 'code.text');
  const status = _get(fhirResource, 'status', '');
  const hasPerformedDateTime = _has(fhirResource, 'performedDateTime');
  const performedDateTime = _get(fhirResource, 'performedDateTime');
  const hasCoding = _has(fhirResource, 'code.coding');
  const coding = _get(fhirResource, 'code.coding', []);
  const hasPerformerData = _has(fhirResource, 'performer.0.actor.display');
  const performer = _get(fhirResource, 'performer', []);
  const hasReasonCode = _has(fhirResource, 'reasonCode');
  const reasonCode = _get(fhirResource, 'reasonCode', []);
  const hasNote = _has(fhirResource, 'note');
  const note = _get(fhirResource, 'note', []);
  return (
    <Root name="procedure">
      <Header>
        <Title> {display}</Title>
        <Badge>{status}</Badge>
        {hasPerformedDateTime && (
          <BadgeSecoundary>
            on <Date fhirData={performedDateTime} />
          </BadgeSecoundary>
        )}
      </Header>
      <Body>
        {hasCoding && (
          <Value label="Elements">
            {coding.map((coding, i) => (
              <Coding key={`item-${i}`} fhirData={coding} />
            ))}
          </Value>
        )}
        {hasPerformerData && (
          <Value label="Performed the procedure">
            {performer.map((item, i) => (
              <div key={`item-${i}`}>{_get(item, 'actor.display', '---')}</div>
            ))}
          </Value>
        )}
        {hasReasonCode && (
          <Value label="Reason procedure performed">
            <Annotation fhirData={reasonCode} />
          </Value>
        )}
        {hasNote && (
          <Value label="Additional information about the procedure">
            <Annotation fhirData={note} />
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
