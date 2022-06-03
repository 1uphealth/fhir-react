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

export function PatientContact(props) {
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

function Patient(props) {
  const {
    fhirResource,
    fhirVersion,
    renderName,
    patientSimple,
    fhirIcons,
    onClick,
    rawOnClick,
    customId,
  } = props;

  const id = getId(fhirResource);
  const patientName = getNames(fhirResource);
  const patientBirthDate = getBirthDate(fhirResource);
  const patientGender = getGender(fhirResource);
  const patientContact = _get(fhirResource, 'contact[0]');
  const patientAddress = _get(fhirResource, 'address[0]');
  const patientPhones = _get(fhirResource, 'telecom', []).filter(
    telecom => telecom.system === 'phone',
  );
  let communicationLanguage = _get(fhirResource, 'communication', [])
    .filter(item => Boolean(_get(item, 'language.coding', null)))
    .map(item => item.language.coding);
  communicationLanguage = _get(communicationLanguage, '0', []);
  const hasCommunicationLanguage = !_isEmpty(communicationLanguage);
  const hasPatientPhones = !_isEmpty(patientPhones);
  const active = _get(fhirResource, 'active', false);
  const activeStatus = active ? 'active' : 'inactive';
  const deceasedBoolean = _get(fhirResource, 'deceasedBoolean', false);
  const deceasedDate = _get(fhirResource, 'deceasedDateTime');
  const isDeceased = deceasedBoolean || deceasedDate;

  const defaultName = (patientName, index) => {
    return <HumanName fhirData={patientName} primary={index === 0} />;
  };

  const tableData = [
    {
      label: 'Patient contact',
      testId: 'patientContact',
      data: patientContact && <PatientContact fhirData={patientContact} />,
      status: patientContact,
    },
    {
      label: 'Deceased',
      testId: 'deceasedInfo',
      data: deceasedDate ? <Date fhirData={deceasedDate} /> : 'yes',
      status: !patientSimple && isDeceased,
    },
    {
      label: 'Address',
      testId: 'patientAddress',
      data: patientAddress && <Address fhirData={patientAddress} />,
      status: !patientSimple && patientAddress,
    },
    {
      label: 'Telephone',
      testId: 'patientPhones',
      data: !hasPatientPhones ? (
        <MissingValue />
      ) : (
        patientPhones.map((telecom, index) => (
          <Telecom key={index} fhirData={telecom} />
        ))
      ),
      status: !patientSimple,
    },
    {
      label: 'Communication - language',
      testId: 'communicationLanguage',
      data:
        hasCommunicationLanguage &&
        communicationLanguage.map((item, i) => (
          <Coding key={`item-${i}`} fhirData={item} />
        )),
      status: !patientSimple && hasCommunicationLanguage,
    },
  ];

  return (
    <Root name="Patient">
      <Accordion
        headerContent={
          <Header
            resourceName="Patient"
            additionalContent={
              patientBirthDate && (
                <span className="text-gray-600">
                  <span data-testid="patientGender" className="text-capitalize">
                    {patientGender || 'unknown'}
                  </span>
                  {', '}
                  <Date testId="patientBirthDate" fhirData={patientBirthDate} />
                </span>
              )
            }
            icon={fhirIcons}
            badges={
              active && <Badge data-testid="activeStatus">{activeStatus}</Badge>
            }
            title={
              renderName
                ? renderName({ patientName, defaultName, fhirVersion, id })
                : defaultName(patientName, 0)
            }
            titleTestID="patientName"
          />
        }
        bodyContent={<Body tableData={tableData} />}
        onClick={onClick}
        rawOnClick={rawOnClick}
        customId={customId}
      />
    </Root>
  );
}

Patient.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Patient;
