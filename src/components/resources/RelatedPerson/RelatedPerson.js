import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import Telecom from '../../datatypes/Telecom';
import Address from '../../datatypes/Address';
import Accordion from '../../containers/Accordion';
import { Root, Header, MissingValue, Badge, Body } from '../../ui';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import Reference from '../../datatypes/Reference';
import fhirVersions from '../fhirResourceVersions';

const dstu2DTO = fhirResource => {
  const patient = _get(fhirResource, 'patient');
  const birthDate = _get(fhirResource, 'birthDate');
  const gender = _get(fhirResource, 'gender');
  const address = _get(fhirResource, 'address[0]');
  const relatedPersonTelecom = _get(fhirResource, 'telecom', []).filter(
    telecom => telecom.system === 'phone',
  );

  return {
    patient,
    birthDate,
    gender,
    address,
    relatedPersonTelecom,
  };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirVersions.DSTU2: {
      return {
        ...dstu2DTO(fhirResource),
      };
    }

    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const RelatedPerson = ({ fhirResource, fhirVersion, fhirIcons }) => {
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="RelatedPerson" />;
  }

  const {
    patient,
    birthDate,
    gender,
    address,
    relatedPersonTelecom,
  } = fhirResourceData;

  const tableData = [
    {
      label: 'Patient',
      testId: 'patient',
      data: patient && <Reference fhirData={patient} />,
      status: patient,
    },
    {
      label: 'Address',
      testId: 'address',
      data: address && <Address fhirData={address} />,
      status: address,
    },
    {
      label: 'Telephone',
      testId: 'telephone',
      data: !relatedPersonTelecom ? (
        <MissingValue />
      ) : (
        relatedPersonTelecom.map((telecom, index) => (
          <Telecom key={index} fhirData={telecom} />
        ))
      ),
      status: relatedPersonTelecom,
    },
  ];

  return (
    <Root name="RelatedPerson">
      <Accordion
        headerContent={
          <Header
            resourceName="RelatedPerson"
            additionalContent={
              birthDate && (
                <span className="text-gray-600">
                  <span data-testid="gender" className="text-capitalize">
                    {gender || 'unknown'}
                  </span>
                  {', '}
                  <span data-testid="birthDate">{birthDate}</span>
                </span>
              )
            }
            icon={fhirIcons}
            title="Related Person"
          />
        }
        bodyContent={<Body tableData={tableData} />}
      />
    </Root>
  );
};

RelatedPerson.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default RelatedPerson;
