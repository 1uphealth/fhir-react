import React from 'react';
import _get from 'lodash/get';

import { Root, Header, Title, Body } from '../../ui';

const Generic = props => {
  const { fhirResource } = props;
  const title = fhirResource
    ? `${fhirResource.resourceType}/${fhirResource.id}`
    : `Unknown Resource`;
  const code =
    _get(fhirResource, 'code.coding[0].display') ||
    _get(fhirResource, 'code.text');

  return (
    <Root>
      <Header>
        <Title>{title}</Title>
      </Header>
      {code && <Body>{code && <p>{code}</p>}</Body>}
    </Root>
  );
};

export default Generic;
