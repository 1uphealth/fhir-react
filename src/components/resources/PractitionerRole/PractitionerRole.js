import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import Reference from '../../datatypes/Reference';
import fhirVersions from '../fhirResourceVersions';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import { Root, Header, Body, Badge } from '../../ui';
import CodeableConcept from '../../datatypes/CodeableConcept/CodeableConcept';
import Accordion from '../../containers/Accordion';

const commonDTO = fhirResource => {
  const status = _get(fhirResource, 'active') === true ? 'active' : '';
  const codes = _get(fhirResource, 'code', []);
  const specialties = _get(fhirResource, 'specialty', []);
  const organization = _get(fhirResource, 'organization');
  const practitioner = _get(fhirResource, 'practitioner');

  return {
    codes,
    status,
    specialties,
    organization,
    practitioner,
  };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirVersions.STU3: {
      return {
        ...commonDTO(fhirResource),
      };
    }
    case fhirVersions.R4: {
      return {
        ...commonDTO(fhirResource),
      };
    }

    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const PractitionerRole = ({
  fhirResource,
  fhirVersion,
  fhirIcons,
  onClick,
  rawOnClick,
  customId,
}) => {
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="PractitionerRole" />;
  }
  const {
    codes,
    status,
    specialties,
    organization,
    practitioner,
  } = fhirResourceData;

  const tableData = [
    {
      label: 'Practitioner',
      testId: 'practitioner',
      data: practitioner && <Reference fhirData={practitioner} />,
      status: practitioner,
    },
    {
      label: 'Organization',
      testId: 'organization',
      data: organization && <Reference fhirData={organization} />,
      status: organization,
    },
    {
      label: 'Specialties',
      testId: 'specialties',
      data: specialties.length > 0 && (
        <CodeableConcept fhirData={specialties} isCursive />
      ),
      status: specialties.length > 0,
    },
    {
      label: 'Roles',
      testId: 'roles',
      data: codes.length > 0 && <CodeableConcept fhirData={codes} isCursive />,
      status: codes.length > 0,
    },
  ];

  return (
    <Root name="PractitionerRole">
      <Accordion
        headerContent={
          <Header
            resourceName="PractitionerRole"
            title="Practitioner roles and specialties"
            badges={status && <Badge data-testid="status">{status}</Badge>}
            icon={fhirIcons}
          />
        }
        bodyContent={<Body tableData={tableData} />}
        onClick={onClick}
        rawOnClick={rawOnClick}
        customId={customId}
      />
    </Root>
  );
};

PractitionerRole.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirVersions.STU3, fhirVersions.R4]).isRequired,
};

export default PractitionerRole;
