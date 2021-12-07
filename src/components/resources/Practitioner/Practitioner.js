import './Practitioner.css';

import { Badge, Body, Header, Root } from '../../ui';

import Accordion from '../../containers/Accordion/Accordion';
import Address from '../../datatypes/Address';
import Date from '../../datatypes/Date';
import HumanName from '../../datatypes/HumanName';
import Identifier from '../../datatypes/Identifier';
import PatientContact from './PatientContact';
import PropTypes from 'prop-types';
import React from 'react';
import Telecom from '../../datatypes/Telecom';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import _get from 'lodash/get';
import _has from 'lodash/has';
import fhirVersions from '../fhirResourceVersions';
import md5 from 'md5';

const commonDTO = fhirResource => {
  const id = _get(fhirResource, 'id', '');
  const identifier = _get(fhirResource, 'identifier', '');
  const gender = _get(fhirResource, 'gender', '');
  const status = _get(fhirResource, 'active') === true ? 'active' : '';
  const isContactData = _has(fhirResource, 'contact[0]');
  const birthDate = _get(fhirResource, 'birthDate');
  const contactData = {
    name: _get(fhirResource, 'contact[0].name'),
    relationship: _get(fhirResource, 'contact[0].relationship[0].text'),
  };

  return {
    id,
    identifier,
    gender,
    status,
    isContactData,
    contactData,
    birthDate,
  };
};
const dstu2DTO = fhirResource => {
  const name = _get(fhirResource, 'name');
  return {
    name,
  };
};
const stu3DTO = fhirResource => {
  const name = _get(fhirResource, 'name.0');
  const address = _get(fhirResource, 'address.0');
  const telecom = _get(fhirResource, 'telecom');
  return {
    name,
    address,
    telecom,
  };
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

const Practitioner = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="Practitioner" />;
  }
  const {
    id,
    identifier,
    name,
    gender,
    status,
    isContactData,
    contactData,
    telecom,
    address,
    birthDate,
  } = fhirResourceData;

  const use = _get(name, 'use');
  const tableData = [
    {
      label: 'Identifiers',
      testId: 'identifier',
      data: identifier && <Identifier fhirData={identifier} />,
      status: identifier,
    },
    {
      label: 'Gender',
      testId: 'gender',
      data: gender,
      status: !!gender,
    },
    {
      label: 'Birth date',
      testId: 'birthDate',
      data: birthDate && <Date fhirData={birthDate} isBlack />,
      status: birthDate,
    },
    {
      label: 'Contact',
      testId: 'contact',
      data: isContactData && (
        <PatientContact
          name={contactData.name}
          relationship={contactData.relationship}
        />
      ),
      status: isContactData,
    },
    {
      label: 'Address',
      testId: 'address',
      data: address && <Address fhirData={address} />,
      status: address,
    },
    {
      label: 'Telephone',
      testId: 'telecom',
      data: telecom && <Telecom fhirData={telecom} />,
      status: telecom,
    },
  ];

  return (
    <Root name="Practitioner">
      <Accordion
        headerContent={
          <Header
            additionalContent={<p className="mb-0">{`(${use})`}</p>}
            badges={status && <Badge data-testid="status">{status}</Badge>}
            icon={
              <img
                className="header-icon__practitioner-avatar rounded-1"
                src={`http://www.gravatar.com/avatar/${md5(
                  id,
                )}?s=30&r=any&default=identicon&forcedefault=1`}
                alt=""
              />
            }
            title={<HumanName fhirData={name} isTitle />}
          />
        }
        bodyContent={<Body tableData={tableData} />}
      />
    </Root>
  );
};

Practitioner.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

export default Practitioner;
