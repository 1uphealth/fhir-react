import React from 'react';
import _get from 'lodash/get';

import { Root, Header } from '../../ui';
import Accordion from '../../containers/Accordion';

const Generic = ({ fhirResource, fhirIcons, onClick }) => {
  const title = fhirResource
    ? `${fhirResource.resourceType}/${fhirResource.id}`
    : `Unknown Resource`;
  const code =
    _get(fhirResource, 'code.coding[0].display') ||
    _get(fhirResource, 'code.text');

  return (
    <Root>
      <Accordion
        headerContent={
          <Header
            resourceName={'Generic'}
            title={title}
            icon={fhirIcons}
            additionalContent={
              code && (
                <span className="text-secondary" data-testid="code">
                  {code}
                </span>
              )
            }
          />
        }
        onClick={onClick}
      />
    </Root>
  );
};

export default Generic;
