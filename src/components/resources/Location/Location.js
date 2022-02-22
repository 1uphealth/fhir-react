import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import { Root, Header, Badge, Body } from '../../ui';
import Address from '../../datatypes/Address';
import Telecom from '../../datatypes/Telecom';
import CodeableConcept from '../../datatypes/CodeableConcept';
import Reference from '../../datatypes/Reference';
import Accordion from '../../containers/Accordion';

const Location = ({ fhirResource, fhirIcons }) => {
  const name = _get(fhirResource, 'name');
  const status = _get(fhirResource, 'status');
  const description = _get(fhirResource, 'description');
  const address = _get(fhirResource, 'address');
  const telecom = _get(fhirResource, 'telecom');
  const type = _get(fhirResource, 'type');
  const physicalType = _get(fhirResource, 'physicalType');
  const mode = _get(fhirResource, 'mode');
  const managingOrganization = _get(fhirResource, 'managingOrganization');

  const tableData = [
    {
      label: 'Type',
      testId: 'type',
      data: type && <CodeableConcept fhirData={type} />,
      status: type,
    },
    {
      label: 'Physical type',
      testId: 'physicalType',
      data: physicalType && <CodeableConcept fhirData={physicalType} />,
      status: physicalType,
    },
    {
      label: 'Location mode',
      testId: 'mode',
      data: mode,
      status: mode,
    },
    {
      label: 'Description',
      testId: 'description',
      data: description,
      status: description,
    },
    {
      label: 'Address',
      testId: 'address',
      data: address && <Address fhirData={address} />,
      status: address,
    },
    {
      label: 'Telecom',
      testId: 'telecom',
      data: telecom && <Telecom fhirData={telecom} />,
      status: telecom,
    },
    {
      label: 'Managing organization',
      testId: 'managingOrganization',
      data: managingOrganization && (
        <Reference fhirData={managingOrganization} />
      ),
      status: managingOrganization,
    },
  ];

  return (
    <Root name="Location">
      <Accordion
        headerContent={
          <Header
            resourceName="Location"
            title={name}
            badges={status && <Badge data-testid="status">{status}</Badge>}
            icon={fhirIcons}
          />
        }
        bodyContent={<Body tableData={tableData} />}
      />
    </Root>
  );
};

Location.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Location;
