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

export function RelatedPersonContact(props) {
  const { fhirData } = props;
  const name = _get(fhirData, 'name');
  const relationship = _get(fhirData, 'relationship[0].text');

  return (
    <div>
      <HumanName fhirData={name} />
      {relationship && (
        <small className="text-bold">{` (${relationship})`}</small>
      )}
    </div>
  );
}

export function getId(fhirResource) {
  return _get(fhirResource, 'id');
}
export function getNames(fhirResource) {
  return _get(fhirResource, 'name.0', null);
}
export function getBirthDate(fhirResource) {
  return _get(fhirResource, 'birthDate');
}
export function getGender(fhirResource) {
  return _get(fhirResource, 'gender');
}

function RelatedPerson(props) {
  const {
    fhirResource,
    fhirVersion,
    renderName,
    RelatedPersonSimple,
    fhirIcons,
  } = props;

  const id = getId(fhirResource);
  const RelatedPersonName = getNames(fhirResource);
  const RelatedPersonBirthDate = getBirthDate(fhirResource);
  const RelatedPersonGender = getGender(fhirResource);
  const RelatedPersonContact = _get(fhirResource, 'contact[0]');
  const RelatedPersonAddress = _get(fhirResource, 'address[0]');
  const RelatedPersonPhones = _get(fhirResource, 'telecom', []).filter(
    telecom => telecom.system === 'phone',
  );
  let communicationLanguage = _get(fhirResource, 'communication', [])
    .filter(item => Boolean(_get(item, 'language.coding', null)))
    .map(item => item.language.coding);
  communicationLanguage = _get(communicationLanguage, '0', []);
  const hasCommunicationLanguage = !_isEmpty(communicationLanguage);
  const hasRelatedPersonPhones = !_isEmpty(RelatedPersonPhones);
  const active = _get(fhirResource, 'active', false);
  const activeStatus = active ? 'active' : 'inactive';
  const deceasedBoolean = _get(fhirResource, 'deceasedBoolean', false);
  const deceasedDate = _get(fhirResource, 'deceasedDateTime');
  const isDeceased = deceasedBoolean || deceasedDate;

  const defaultName = (RelatedPersonName, index) => {
    return <HumanName fhirData={RelatedPersonName} primary={index === 0} />;
  };

  const tableData = [
    {
      label: 'RelatedPerson contact',
      testId: 'RelatedPersonContact',
      data: RelatedPersonContact && (
        <RelatedPersonContact fhirData={RelatedPersonContact} />
      ),
      status: RelatedPersonContact,
    },
    {
      label: 'Deceased',
      testId: 'deceasedInfo',
      data: deceasedDate ? <Date fhirData={deceasedDate} /> : 'yes',
      status: !RelatedPersonSimple && isDeceased,
    },
    {
      label: 'Address',
      testId: 'RelatedPersonAddress',
      data: RelatedPersonAddress && <Address fhirData={RelatedPersonAddress} />,
      status: !RelatedPersonSimple && RelatedPersonAddress,
    },
    {
      label: 'Telephone',
      testId: 'RelatedPersonPhones',
      data: !hasRelatedPersonPhones ? (
        <MissingValue />
      ) : (
        RelatedPersonPhones.map((telecom, index) => (
          <Telecom key={index} fhirData={telecom} />
        ))
      ),
      status: !RelatedPersonSimple,
    },
    {
      label: 'Communication - language',
      testId: 'communicationLanguage',
      data:
        hasCommunicationLanguage &&
        communicationLanguage.map((item, i) => (
          <Coding key={`item-${i}`} fhirData={item} />
        )),
      status: !RelatedPersonSimple && hasCommunicationLanguage,
    },
  ];

  return (
    <Root name="RelatedPerson">
      <Accordion
        headerContent={
          <Header
            resourceName="RelatedPerson"
            additionalContent={
              RelatedPersonBirthDate && (
                <span className="text-gray-600">
                  <span
                    data-testid="RelatedPersonGender"
                    className="text-capitalize"
                  >
                    {RelatedPersonGender || 'unknown'}
                  </span>
                  {', '}
                  <span data-testid="RelatedPersonBirthDate">
                    {RelatedPersonBirthDate}
                  </span>
                </span>
              )
            }
            icon={fhirIcons}
            badges={
              active && <Badge data-testid="activeStatus">{activeStatus}</Badge>
            }
            title={
              renderName
                ? renderName({
                    RelatedPersonName,
                    defaultName,
                    fhirVersion,
                    id,
                  })
                : defaultName(RelatedPersonName, 0)
            }
            titleTestID="RelatedPersonName"
          />
        }
        bodyContent={<Body tableData={tableData} />}
      />
    </Root>
  );
}

RelatedPerson.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default RelatedPerson;
