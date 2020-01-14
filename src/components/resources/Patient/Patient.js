import React from 'react';
import PropTypes from 'prop-types';
import crypto from 'crypto';
import _get from 'lodash/get';

import HumanName from '../../datatypes/HumanName';
import Telecom from '../../datatypes/Telecom';
import Address from '../../datatypes/Address';
import { Root, Header, Body, Value, MissingValue } from '../../ui';
import './Patient.css';

function PatientContact(props) {
  const { fhirData } = props;
  const name = _get(fhirData, 'name');
  const relationship = _get(fhirData, 'relationship[0].text');

  return (
    <div>
      <HumanName fhirData={name} />
      <small className="fhir-resource__Patient__patientContact-relationship">{` (${relationship})`}</small>
    </div>
  );
}

function Patient(props) {
  const { fhirResource } = props;

  const id = _get(fhirResource, 'id');
  const idHash = crypto
    .createHash('md5')
    .update(id || '')
    .digest('hex');
  const avatarSrc = `http://www.gravatar.com/avatar/${idHash}?s=50&r=any&default=identicon&forcedefault=1`;
  const patientNames = _get(fhirResource, 'name', []);
  const patientBirthDate = _get(fhirResource, 'birthDate');
  const patientGender = _get(fhirResource, 'gender');
  const patientContact = _get(fhirResource, 'contact[0]');
  const patientAddress = _get(fhirResource, 'address[0]');
  const patientPhones = _get(fhirResource, 'telecom', []).filter(
    telecom => telecom.system === 'phone',
  );

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
                      <span data-testid="patientName">
                        <HumanName
                          fhirData={patientName}
                          primary={index === 0}
                        />
                      </span>
                      &nbsp;&nbsp;
                    </React.Fragment>
                  );
                }
              })}
            </div>
            <div>
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
        {patientAddress && (
          <Value label="Address" data-testid="patientAddress">
            <Address fhirData={patientAddress} />
          </Value>
        )}
        {patientPhones && (
          <Value label="TELEPHONE" data-testid="patientPhones">
            {patientPhones.map((telecom, index) => (
              <div key={index}>
                <Telecom fhirData={telecom} />
              </div>
            ))}
            {patientPhones.length === 0 && <MissingValue />}
          </Value>
        )}
      </Body>
    </Root>
  );
}

PatientContact.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Patient;
