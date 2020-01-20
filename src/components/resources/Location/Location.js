import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import { Root, Header, Title, Badge, Body, Value } from '../../ui';
import Address from '../../datatypes/Address';
import Telecom from '../../datatypes/Telecom';

const Location = props => {
  const { fhirResource } = props;
  const name = _get(fhirResource, 'name');
  const status = _get(fhirResource, 'status');
  const description = _get(fhirResource, 'description');
  const address = _get(fhirResource, 'address');
  const telecom = _get(fhirResource, 'telecom');
  return (
    <Root name="Location">
      <Header>
        {name && <Title>{name}</Title>}
        {status && <Badge data-testid="status">{status}</Badge>}
      </Header>
      <Body>
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
      </Body>
    </Root>
  );
};

Location.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Location;
