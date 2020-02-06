import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { Root, Header, Title, Body, Value } from '../../ui';
import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';

const AdverseEvent = props => {
  const { fhirResource } = props;
  const subject = _get(fhirResource, 'subject');
  const description = _get(fhirResource, 'description');
  const typeCoding = _get(fhirResource, 'type.coding', []);
  const hasTypeCoding = Array.isArray(typeCoding) && typeCoding.length > 0;
  const date = _get(fhirResource, 'date');
  const seriousness = _get(fhirResource, 'seriousness.coding', []);
  const hasSeriousness = Array.isArray(seriousness) && seriousness.length > 0;
  return (
    <Root name="AdverseEvent">
      <Header>
        {subject && (
          <Title>
            <Reference fhirData={subject} />
          </Title>
        )}
      </Header>
      <Body>
        {date && (
          <Value label="Date" data-testid="date">
            <Date fhirData={date} />
          </Value>
        )}
        {hasTypeCoding && (
          <Value label="Type" data-testid="type">
            {typeCoding.map((item, i) => (
              <Coding key={`item-${i}`} fhirData={item} />
            ))}
          </Value>
        )}
        {description && (
          <Value label="Description" data-testid="description">
            {description}
          </Value>
        )}
        {hasSeriousness && (
          <Value label="Seriousness" data-testid="hasSeriousness">
            {seriousness.map((item, i) => (
              <Coding key={`item-${i}`} fhirData={item} />
            ))}
          </Value>
        )}
      </Body>
    </Root>
  );
};

AdverseEvent.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default AdverseEvent;
