import React from 'react';
import PropTypes from 'prop-types';

import HumanName from '../../datatypes/HumanName';
import { Root, Header, Body } from '../../ui';
import { getId, getNames, getBirthDate, getGender } from './Patient';

import './PatientSimple.css';

function PatientSimple(props) {
  const { fhirResource } = props;

  const id = getId(fhirResource);
  const patientNames = getNames(fhirResource);
  const patientBirthDate = getBirthDate(fhirResource);
  const patientGender = getGender(fhirResource);

  let genderSign = null;
  if (patientGender === 'male') {
    genderSign = '♂';
  } else if (patientGender === 'female') {
    genderSign = '♀';
  }
  return (
    <Root name="PatientSimple">
      <Header>
        <div className="fhir-resource__PatientSimple__patient-block">
          <div>
            <div className="fhir-resource__PatientSimple__patient-block">
              <span
                className="fhir-resource__PatientSimple__gender"
                data-testid="patientGender"
              >
                {genderSign && genderSign}
              </span>
              {patientNames.map((patientName, index) => {
                if (props.thorough === false && index !== 0) {
                  return null;
                } else {
                  return (
                    <React.Fragment key={index}>
                      <span data-testid={`patientName-${index}`}>
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
              {id && (
                <span className="fhir-resource__PatientSimple__item">
                  <label className="fhir-resource__PatientSimple__label">
                    ID
                  </label>
                  <span data-testid="patientId">{id}</span>
                </span>
              )}
              {patientBirthDate && (
                <span className="fhir-resource__PatientSimple__item">
                  <label className="fhir-resource__PatientSimple__label">
                    DOB
                  </label>
                  <span data-testid="patientBirthDate">{patientBirthDate}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </Header>
      <Body></Body>
    </Root>
  );
}

PatientSimple.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default PatientSimple;
