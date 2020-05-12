import React from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import ObservationGraph from './ObservationGraph';
import {
  Root,
  Header,
  Title,
  Badge,
  BadgeSecondary,
  Body,
  Value,
} from '../../ui';
import Reference from '../../datatypes/Reference';

const Observation = props => {
  const { fhirResource } = props;
  const effectiveDate = _get(fhirResource, 'effectiveDateTime');
  const codeCodingDisplay = _get(fhirResource, 'code.coding.0.display');
  const codeText = _get(fhirResource, 'code.text', '');
  const valueQuantityValue = _get(fhirResource, 'valueQuantity.value', '');
  const valueQuantityUnit = _get(fhirResource, 'valueQuantity.unit', '');
  const status = _get(fhirResource, 'status', '');
  const valueCodeableConceptText = _get(
    fhirResource,
    'valueCodeableConcept.text',
  );
  const valueCodeableConceptCodingDisplay = _get(
    fhirResource,
    'valueCodeableConcept.coding[0].display',
  );
  const valueCodeableConceptCoding = _get(
    fhirResource,
    'valueCodeableConcept.coding',
    [],
  );

  const valueQuantityString = `${valueQuantityValue}${valueQuantityUnit}`.trim();
  const subject = _get(fhirResource, 'subject');

  return (
    <Root name="Observation">
      <Header>
        <Title>
          {codeCodingDisplay || codeText}
          {valueQuantityString && (
            <>
              &nbsp;
              <code>{valueQuantityString}</code>
            </>
          )}
        </Title>
        {status && <Badge data-testid="status">{status}</Badge>}
        {(valueCodeableConceptText || valueCodeableConceptCodingDisplay) && (
          <BadgeSecondary data-testid="secondaryStatus">
            {valueCodeableConceptText || valueCodeableConceptCodingDisplay}
          </BadgeSecondary>
        )}
      </Header>
      <Body>
        <ObservationGraph
          valueQuantity={fhirResource.valueQuantity}
          referenceRange={fhirResource.referenceRange}
        />
        {effectiveDate && (
          <Value label="Issued on" data-testid="issuedOn">
            <Date fhirData={effectiveDate} />
          </Value>
        )}
        {subject && (
          <Value label="Subject" data-testid="subject">
            <Reference fhirData={subject} />
          </Value>
        )}
        {valueCodeableConceptCoding.map((coding, i) => (
          <Coding fhirData={coding} key={`value-coding-${i}`} />
        ))}
      </Body>
    </Root>
  );
};

Observation.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Observation;
