import React from 'react';
import PropTypes from 'prop-types';

import Reference from '../../datatypes/Reference';
import _get from 'lodash/get';
import _has from 'lodash/has';
import CodeableConcept from '../../datatypes/CodeableConcept';

import {
  Root,
  Header,
  Title,
  Badge,
  BadgeSecondary,
  Body,
  Value,
} from '../../ui';

function Condition(props) {
  const { fhirResource } = props;
  const codeText =
    _get(fhirResource, 'code.coding.0.display') ||
    _get(fhirResource, 'code.text') ||
    _get(fhirResource, 'code.coding.0.code');
  const severityText =
    _get(fhirResource, 'severity.coding.0.display') ||
    _get(fhirResource, 'severity.text');
  const clinicalStatus = _get(fhirResource, 'clinicalStatus');
  const onsetDateTime = _get(fhirResource, 'onsetDateTime');
  const dateRecorded = _get(fhirResource, 'dateRecorded');
  const hasAsserter = _has(fhirResource, 'asserter');
  const asserter = _get(fhirResource, 'asserter');
  const hasBodySite = _get(fhirResource, 'bodySite.0.coding.0.display');
  const bodySite = _get(fhirResource, 'bodySite');

  return (
    <Root name="condition">
      <Header>
        <Title>{codeText || ''}</Title>
        <Badge data-testid="clinicalStatus">{clinicalStatus || ''}</Badge>
        {severityText && (
          <BadgeSecondary data-testid="severity">
            {severityText} severity
          </BadgeSecondary>
        )}
      </Header>
      <Body>
        {onsetDateTime && (
          <Value label="Onset Date" data-testid="onsetDate">
            {onsetDateTime}
          </Value>
        )}
        {dateRecorded && (
          <Value label="Date recorded" data-testid="dateRecorded">
            {dateRecorded}
          </Value>
        )}
        {hasAsserter && (
          <Value label="Asserted by" data-testid="asserter">
            <Reference fhirData={asserter} />
          </Value>
        )}
        {hasBodySite && (
          <Value label="Anatomical locations" data-testid="bodySite">
            <CodeableConcept fhirData={bodySite} />
          </Value>
        )}
      </Body>
    </Root>
  );
}

Condition.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Condition;
