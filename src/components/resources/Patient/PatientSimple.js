import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import md5 from 'md5';

import HumanName from '../../datatypes/HumanName';
import Address from '../../datatypes/Address';
import Date from '../../datatypes/Date';
import { Root, Header, Body, Value, Badge } from '../../ui';
import './Patient.css';

function PatientContact(props) {
  const { fhirData } = props;
  const name = _get(fhirData, 'name');
  const relationship = _get(fhirData, 'relationship[0].text');

  return (
    <div>
      <HumanName fhirData={name} />
      {relationship && (
        <small className="fhir-resource__Patient__patientContact-relationship">{` (${relationship})`}</small>
      )}
    </div>
  );
}

export function getId(fhirResource) {
  return _get(fhirResource, 'id');
}
export function getNames(fhirResource) {
  return _get(fhirResource, 'name', []);
}
export function getBirthDate(fhirResource) {
  return _get(fhirResource, 'birthDate');
}
export function getGender(fhirResource) {
  return _get(fhirResource, 'gender');
}

function Patientsimple(props) {
  const { fhirResource, fhirVersion, renderName } = props;

  const id = getId(fhirResource);
  const idHash = md5(id || '');
  const avatarSrc = `http://www.gravatar.com/avatar/${idHash}?s=50&r=any&default=identicon&forcedefault=1`;
  const patientNames = getNames(fhirResource);
  const patientBirthDate = getBirthDate(fhirResource);
  const patientGender = getGender(fhirResource);
  const patientContact = _get(fhirResource, 'contact[0]');
  const active = _get(fhirResource, 'active', false);
  const activeStatus = active ? 'active' : 'inactive';
  const deceasedBoolean = _get(fhirResource, 'deceasedBoolean', false);
  const deceasedDate = _get(fhirResource, 'deceasedDateTime');
  const isDeceased = deceasedBoolean || deceasedDate;

  const defaultName = (patientName, index) => {
    return <HumanName fhirData={patientName} primary={index === 0} />;
  };

  return (
    <Root name="Patient">
      <Header>
        <div className="fhir-resource__Patient__patient-block">
          <div>
            <img
              className="fhir-resource__Patient__patient-avatar"
              src={avatarSrc}
              alt=""
            />
          </div>
          <div>
            <div className="fhir-resource__Patient__patient-block">
              {patientNames.map((patientName, index) => {
                if (props.thorough === false && index !== 0) {
                  return null;
                } else {
                  return (
                    <React.Fragment key={index}>
                      <span data-testid={`patientName-${index}`}>
                        {renderName
                          ? renderName({
                              patientName,
                              defaultName,
                              fhirVersion,
                              id,
                            })
                          : defaultName(patientName, index)}
                      </span>
                      &nbsp;&nbsp;
                    </React.Fragment>
                  );
                }
              })}
            </div>
            <div>
              {active && (
                <Badge data-testid="activeStatus">{activeStatus}</Badge>
              )}
              {patientBirthDate && (
                <span className="fhir-resource__Patient__BirthDate-block">
                  <strong>
                    <span data-testid="patientGender">
                      {patientGender || 'unknown'}
                    </span>
                    {', '}
                    <span data-testid="patientBirthDate">
                      {patientBirthDate}
                    </span>
                  </strong>
                  <small> (DOB)</small>
                </span>
              )}
            </div>
            <div>
              {patientContact && <PatientContact fhirData={patientContact} />}
            </div>
          </div>
        </div>
      </Header>
      <Body>
        {isDeceased && (
          <Value label="Deceased" data-testid="deceasedInfo">
            {deceasedDate ? <Date fhirData={deceasedDate} /> : 'yes'}
          </Value>
        )}
      </Body>
    </Root>
  );
}

Patientsimple.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Patientsimple;
