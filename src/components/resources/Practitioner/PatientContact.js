import React from 'react';
import PropTypes from 'prop-types';
import HumanName from '../../datatypes/HumanName';

const PatientContact = props => {
  return (
    <div>
      <HumanName fhirData={props.name} />
      <small className="fhir-resource__Practitioner__patientContact-relationship">
        {props.relationship}
      </small>
    </div>
  );
};

PatientContact.propTypes = {
  name: PropTypes.string,
  relationship: PropTypes.string,
};

export default PatientContact;
