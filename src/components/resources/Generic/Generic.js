import React from 'react';
import _get from 'lodash/get';

import { Root, Header, Body } from '../../ui';
import Accordion from '../../containers/Accordion';

const Generic = ({ fhirResource, fhirIcons }) => {
  const title = fhirResource
    ? `${fhirResource.resourceType}/${fhirResource.id}`
    : `Unknown Resource`;
  const code =
    _get(fhirResource, 'code.coding[0].display') ||
    _get(fhirResource, 'code.text');

  const tableData = [
    {
      label: 'Code',
      testId: '',
      data: code,
      status: code,
    },
  ];

  return (
    <Root>
      <Accordion
        headerContent={
          <Header resourceName={'Generic'} title={title} icon={fhirIcons} />
        }
        bodyContent={code && <Body tableData={tableData} />}
      />
    </Root>
  );
};

export default Generic;
