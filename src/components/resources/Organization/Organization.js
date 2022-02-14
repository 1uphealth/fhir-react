import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _flatten from 'lodash/flatten';
import Coding from '../../datatypes/Coding';
import Address from '../../datatypes/Address';
import Telecom from '../../datatypes/Telecom';
import Identifier from '../../datatypes/Identifier';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';
import { Root, Header, Body, NotEnoughData } from '../../ui';
import Accordion from '../../containers/Accordion';

const commonDTO = fhirResource => {
  const identifier = _get(fhirResource, 'identifier', '');
  const name = _get(fhirResource, 'name');
  const addresses = _get(fhirResource, 'address');
  const telecom = _get(fhirResource, 'telecom');

  return { identifier, name, addresses, telecom };
};
const dstu2DTO = fhirResource => {
  const typeCodings = _get(fhirResource, 'type.coding');
  return { typeCodings };
};
const stu3DTO = fhirResource => {
  const typeCodings = _get(fhirResource, 'type', []).map(type => type.coding);
  return { typeCodings: _flatten(typeCodings) };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirVersions.DSTU2: {
      return {
        ...commonDTO(fhirResource),
        ...dstu2DTO(fhirResource),
      };
    }
    case fhirVersions.STU3: {
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
      };
    }
    case fhirVersions.R4: {
      // there are not any breaking changes between STU3 and R4 version
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
      };
    }

    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const Organization = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="Practitioner" />;
  }
  const {
    identifier,
    name,
    addresses,
    telecom,
    typeCodings,
  } = fhirResourceData;
  const hasAddresses = Array.isArray(addresses) && addresses.length > 0;
  const hasTelecom = Array.isArray(telecom) && telecom.length > 0;
  const hasTypes = Array.isArray(typeCodings) && typeCodings.length > 0;
  const notEnoughData = !hasAddresses && !hasTelecom && !hasTypes;

  const tableData = [
    {
      label: 'Identifiers',
      testId: 'identifier',
      data: identifier && <Identifier fhirData={identifier} />,
      status: identifier,
    },
    {
      label: 'Addresses',
      testId: 'address',
      data:
        hasAddresses &&
        addresses.map((item, i) => (
          <Address key={`item-${i}`} fhirData={item} />
        )),
      status: hasAddresses,
    },
    {
      label: 'Contacts',
      testId: 'contact',
      data:
        hasTelecom &&
        telecom.map((item, i) => <Telecom key={`item-${i}`} fhirData={item} />),
      status: hasTelecom,
    },
    {
      label: 'Type',
      testId: 'type',
      data:
        hasTypes &&
        typeCodings.map((typeCoding, idx) => (
          <Coding key={idx} fhirData={typeCoding} />
        )),
      status: hasTypes,
    },
    {
      label: '',
      testId: '',
      data: notEnoughData && <NotEnoughData data-testid="NotEnoughData" />,
      status: notEnoughData,
    },
  ];

  return (
    <Root name="Organization">
      <Accordion
        headerContent={
          name && <Header resourceName="Organization" title={name} />
        }
        bodyContent={<Body tableData={tableData} />}
      />
    </Root>
  );
};

Organization.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

export default Organization;
