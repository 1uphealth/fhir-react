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

const Observation = props => {
  const { fhirResource } = props;
  const { issued } = fhirResource;
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
        <Badge>{status}</Badge>
        <BadgeSecondary>
          {valueCodeableConceptText || valueCodeableConceptCodingDisplay}
        </BadgeSecondary>
      </Header>
      <Body>
        <ObservationGraph
          valueQuantity={fhirResource.valueQuantity}
          referenceRange={fhirResource.referenceRange}
        />
        {issued && (
          <Value label="Issued on">
            <Date fhirData={issued} />
          </Value>
        )}
        {valueCodeableConceptCoding.map(coding => (
          <Coding fhirData={coding} />
        ))}
      </Body>
    </Root>
  );
};

Observation.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Observation;
