import React from 'react';
import PropTypes from 'prop-types';

import Coding from '../../datatypes/Coding';
import Reference from '../../datatypes/Reference';

import _get from 'lodash/get';
import {
  Root,
  Header,
  Title,
  BadgeSecondary,
  Badge,
  Body,
  Value,
} from '../../ui';

const FamilyMemberHistory = props => {
  const { fhirResource } = props;
  const title =
    _get(fhirResource, 'condition[0].code.text') ||
    _get(fhirResource, 'condition[0].code.coding[0].display', '');

  const date = _get(fhirResource, 'date');
  const status = _get(fhirResource, 'status');
  const relationship = _get(fhirResource, 'relationship.coding', []);
  const hasRelationship = relationship.length > 0;
  const noteText = _get(fhirResource, 'condition.0.note.text');
  const patient = _get(fhirResource, 'patient');

  return (
    <Root name="FamilyMemberHistory">
      <Header>
        <Title>{title}</Title>
        {status && <Badge data-testid="status">{status}</Badge>}
        {date && <BadgeSecondary>on {date}</BadgeSecondary>}
      </Header>
      <Body>
        {patient && (
          <Value label="Patient" data-testid="patient">
            <Reference fhirData={patient} />
          </Value>
        )}
        {hasRelationship && (
          <Value label="Relationship" data-testid="hasRelationship">
            {relationship.map((item, i) => (
              <Coding key={`item-${i}`} fhirData={item} />
            ))}
          </Value>
        )}
        {noteText && (
          <Value label="Note" data-testid="noteText">
            {noteText}
          </Value>
        )}
      </Body>
    </Root>
  );
};

FamilyMemberHistory.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default FamilyMemberHistory;
