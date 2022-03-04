import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

import HumanName from '../../datatypes/HumanName';
import Telecom from '../../datatypes/Telecom';
import Address from '../../datatypes/Address';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import Accordion from '../../containers/Accordion';
import { Root, Header, MissingValue, Badge, Body } from '../../ui';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';

const dstu2DTO = fhirResource => {
  const patient = _get(fhirResource, 'patient'); // patient.reference
  const birthDate = _get(fhirResource, 'birthDate');
  const gender = _get(fhirResource, 'gender');
  const address = _get(fhirResource, 'address[0]');
  const telecom = _get(fhirResource, 'telecom', []).filter(
    telecom => telecom.system === 'phone',
  );

  return {
    patient,
    birthDate,
    gender,
    address,
    telecom,
  };
};

export function getGender(fhirResource) {
  return _get(fhirResource, '');
}

const RelatedPerson = ({ fhirResource, fhirVersion, fhirIcons }) => {
  let fhirResourceData = {};
  try {
    fhirResourceData = dstu2DTO(fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="RelatedPerson" />;
  }

  console.log({ fhirResourceData });
  const { patient, birthDate, gender, address, telecom } = fhirResourceData;

  // const tableData = [
  //   {
  //     label: 'RelatedPerson contact',
  //     testId: 'RelatedPersonContact',
  //     data: RelatedPersonContact && (
  //       <RelatedPersonContact fhirData={RelatedPersonContact} />
  //     ),
  //     status: RelatedPersonContact,
  //   },
  //   {
  //     label: 'Deceased',
  //     testId: 'deceasedInfo',
  //     data: deceasedDate ? <Date fhirData={deceasedDate} /> : 'yes',
  //     status: !RelatedPersonSimple && isDeceased,
  //   },
  //   {
  //     label: 'Address',
  //     testId: 'RelatedPersonAddress',
  //     data: RelatedPersonAddress && <Address fhirData={RelatedPersonAddress} />,
  //     status: !RelatedPersonSimple && RelatedPersonAddress,
  //   },
  //   {
  //     label: 'Telephone',
  //     testId: 'RelatedPersonPhones',
  //     data: !hasRelatedPersonPhones ? (
  //       <MissingValue />
  //     ) : (
  //       RelatedPersonPhones.map((telecom, index) => (
  //         <Telecom key={index} fhirData={telecom} />
  //       ))
  //     ),
  //     status: !RelatedPersonSimple,
  //   },
  //   {
  //     label: 'Communication - language',
  //     testId: 'communicationLanguage',
  //     data:
  //       hasCommunicationLanguage &&
  //       communicationLanguage.map((item, i) => (
  //         <Coding key={`item-${i}`} fhirData={item} />
  //       )),
  //     status: !RelatedPersonSimple && hasCommunicationLanguage,
  //   },
  // ];

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
        bodyContent={<Body tableData={[]} />}
      />
    </Root>
  );
};

RelatedPerson.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default RelatedPerson;
