import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Coding from '../../datatypes/Coding';
import Address from '../../datatypes/Address';
import Telecom from '../../datatypes/Telecom';
import { Root, Header, Title, Body, Value } from '../../ui';

const Organization = props => {
  const { fhirResource } = props;
  const name = _get(fhirResource, 'name');
  const typeCoding = _get(fhirResource, 'type.coding.0');
  const addresses = _get(fhirResource, 'address');
  const hasAddresses = Array.isArray(addresses) && addresses.length > 0;
  const telecom = _get(fhirResource, 'telecom');
  const hasTelecom = Array.isArray(telecom) && telecom.length > 0;
  return (
    <Root name="organization">
      {name && (
        <Header>
          <Title>{name}</Title>
        </Header>
      )}
      <Body>
        {typeCoding && (
          <Value label="Type">
            <Coding fhirData={typeCoding} />
          </Value>
        )}
        {hasAddresses && (
          <Value label="Addresses" data-testid="address">
            {addresses.map((item, i) => (
              <Address key={`item-${i}`} fhirData={item} />
            ))}
          </Value>
        )}
        {hasTelecom && (
          <Value label="Contacts" data-testid="contact">
            {telecom.map((item, i) => (
              <Telecom key={`item-${i}`} fhirData={item} />
            ))}
          </Value>
        )}
      </Body>
    </Root>
  );
};

Organization.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Organization;
