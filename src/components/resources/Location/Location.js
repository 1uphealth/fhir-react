import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import { Root, Header, Title, Badge, Body, Value } from '../../ui';
import Address from '../../datatypes/Address';
import Telecom from '../../datatypes/Telecom';
import CodeableConcept from '../../datatypes/CodeableConcept';
import Reference from '../../datatypes/Reference';

const Location = props => {
  const { fhirResource } = props;
  const name = _get(fhirResource, 'name');
  const status = _get(fhirResource, 'status');
  const description = _get(fhirResource, 'description');
  const address = _get(fhirResource, 'address');
  const telecom = _get(fhirResource, 'telecom');
  const type = _get(fhirResource, 'type');
  const physicalType = _get(fhirResource, 'physicalType');
  const mode = _get(fhirResource, 'mode');
  const managingOrganization = _get(fhirResource, 'managingOrganization');
  return (
    <Root name="Location">
      <Header>
        {name && <Title>{name}</Title>}
        {status && <Badge data-testid="status">{status}</Badge>}
      </Header>
      <Body>
        {type && (
          <Value label="Type" data-testid="type">
            <CodeableConcept fhirData={type} />
          </Value>
        )}
        {physicalType && (
          <Value label="Physical type" data-testid="physicalType">
            <CodeableConcept fhirData={physicalType} />
          </Value>
        )}
        {mode && (
          <Value label="Location mode" data-testid="mode">
            {mode}
          </Value>
        )}
        {description && (
          <Value label="Description" data-testid="description">
            {description}
          </Value>
        )}
        {address && (
          <Value label="Address" data-testid="address">
            <Address fhirData={address} />
          </Value>
        )}
        {telecom && (
          <Value label="Telecom" data-testid="telecom">
            <Telecom fhirData={telecom} />
          </Value>
        )}
        {managingOrganization && (
          <Value
            label="Managing organization"
            data-testid="managingOrganization"
          >
            <Reference fhirData={managingOrganization} />
          </Value>
        )}
      </Body>
    </Root>
  );
};

Location.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Location;
