import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Coding from '../../datatypes/Coding';
import Address from '../../datatypes/Address';
import Telecom from '../../datatypes/Telecom';

const Organization = props => {
  const { fhirResource } = props;
  const name = _get(fhirResource, 'name');
  const typeCoding = _get(fhirResource, 'type.coding.0');
  const addresses = _get(fhirResource, 'address');
  const hasAddresses = Array.isArray(addresses) && addresses.length > 0;
  const telecom = _get(fhirResource, 'telecom');
  const hasTelecom = Array.isArray(telecom) && telecom.length > 0;
  return (
    <div>
      {name && <h4 data-testid="name">{name}</h4>}
      {typeCoding && (
        <div>
          <Coding fhirData={typeCoding} />
        </div>
      )}
      {hasAddresses && (
        <div data-testid="address">
          <label>Addresses</label>
          {addresses.map((item, i) => (
            <Address key={`item-${i}`} fhirData={item} />
          ))}
        </div>
      )}
      {hasTelecom && (
        <div data-testid="contact">
          <label>Contacts</label>
          {telecom.map((item, i) => (
            <Telecom key={`item-${i}`} fhirData={item} />
          ))}
        </div>
      )}
    </div>
  );
};

Organization.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Organization;
