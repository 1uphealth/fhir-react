import React from 'react';
import PropTypes from 'prop-types';

import crypto from 'crypto';
import _get from 'lodash/get';
import _has from 'lodash/has';
import HumanName from '../../datatypes/HumanName';
import PatientContact from './PatientContact';
import fhirTypes from '../fhirResourceTypes';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import Address from '../../datatypes/Address';
import Telecom from '../../datatypes/Telecom';

const commonDTO = fhirResource => {
  const id = _get(fhirResource, 'id', '');
  const gender = _get(fhirResource, 'gender', '');
  const status = _get(fhirResource, 'active') === true ? 'active' : '';
  const isContactData = _has(fhirResource, 'contact[0]');
  const contactData = {
    name: _get(fhirResource, 'contact[0].name'),
    relationship: _get(fhirResource, 'contact[0].relationship[0].text'),
  };
  return {
    id,
    gender,
    status,
    isContactData,
    contactData,
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
    case fhirTypes.DSTU2: {
      return {
        ...commonDTO(fhirResource),
        ...dstu2DTO(fhirResource),
      };
    }
    case fhirTypes.STU3: {
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
      };
    }

    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const Patient = props => {
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
    name,
    gender,
    status,
    isContactData,
    contactData,
    telecom,
    address,
  } = fhirResourceData;
  return (
    <div>
      <div className="row">
        <div className="col-xs-4">
          <img
            style={{ border: '4px solid #fff', borderRadius: '500px' }}
            src={`http://www.gravatar.com/avatar/${crypto
              .createHash('md5')
              .update(id)
              .digest('hex')}?s=30&r=any&default=identicon&forcedefault=1`}
            alt=""
          />
          &nbsp;
        </div>
        <div className="col-xs-8">
          <span data-testid="name">
            <HumanName fhirData={name} primary={true} />
            &nbsp;&nbsp;
          </span>
          {gender && (
            <div>
              <label className="sb-heading">Gender</label>
              <div data-testid="gender">{gender}</div>
            </div>
          )}
          {status && (
            <div>
              <label className="sb-heading">Status</label>
              <div data-testid="status">{status}</div>
            </div>
          )}
          <div>
            {isContactData && (
              <PatientContact
                name={contactData.name}
                relationship={contactData.relationship}
              />
            )}
          </div>
          {address && (
            <div>
              <label className="sb-heading" data-testid="address">
                Address
              </label>
              <Address fhirData={address} />
            </div>
          )}
          {telecom && (
            <div>
              <label className="sb-heading" data-testid="telecom">
                Telephone
              </label>
              <Telecom fhirData={telecom} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Patient.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([('dstu2', 'stu3')]).isRequired,
};

export default Patient;
