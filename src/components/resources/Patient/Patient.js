import React from 'react';
import HumanName from '../../datatypes/HumanName';
import Telecom from '../../datatypes/Telecom';
import Address from '../../datatypes/Address';
import ResourceContainer from '../../container/ResourceContainer';
import crypto from 'crypto';
var _ = require('lodash');

class PatientContact extends React.Component {
  render() {
    return (
      <div>
        <HumanName fhirData={_.get(this.props.fhirData, 'name')} />
        <small className="text-muted">{`(${_.get(
          this.props.fhirData,
          'relationship[0].text',
        ) || ''})`}</small>
      </div>
    );
  }
}

class Patient extends React.Component {
  render() {
    return (
      <div>
        <ResourceContainer {...this.props}>
          <div className="row">
            <div className="col-xs-4">
              <img
                style={{ border: '4px solid #fff', borderRadius: '500px' }}
                src={`http://www.gravatar.com/avatar/${crypto
                  .createHash('md5')
                  .update(_.get(this.props.fhirResource, 'id') || '')
                  .digest('hex')}?s=70&r=any&default=identicon&forcedefault=1`}
                alt=""
              />
              &nbsp;
            </div>
            <div className="col-xs-8">
              {(_.get(this.props.fhirResource, 'name') || []).map(
                function(patientName, index) {
                  if (this.props.thorough === false && index !== 0) {
                    return '';
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
                }.bind(this),
              )}
              <div>
                {_.get(this.props.fhirResource, 'birthDate') ? (
                  <span className="text-muted">
                    <strong>
                      <span data-testid="patientGender">
                        {_.get(this.props.fhirResource, 'gender') || ''}
                      </span>
                      {', '}
                      <span data-testid="patientBirthDate">
                        {_.get(this.props.fhirResource, 'birthDate') || ''}
                      </span>
                    </strong>{' '}
                    <small>(DOB)</small>
                  </span>
                ) : (
                  ''
                )}
              </div>
              <div>
                {_.get(this.props.fhirResource, 'contact[0]') ? (
                  <PatientContact
                    fhirData={_.get(this.props.fhirResource, 'contact[0]')}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <div style={{ paddingTop: '.5rem' }}>
            <small className="text-muted">
              <strong>ADDRESS</strong>
            </small>
            <div data-testid="patientAddress">
              <Address
                fhirData={_.get(this.props.fhirResource, 'address[0]')}
              />
            </div>
          </div>
          <div style={{ paddingTop: '.5rem' }}>
            <small className="text-muted">
              <strong>TELEPHONE</strong>
            </small>
            <div data-testid="patientPhones">
              {(_.get(this.props.fhirResource, 'telecom') || []).map(function(
                telecom,
                index,
              ) {
                if (telecom.system === 'phone') {
                  return (
                    <div key={index}>
                      <Telecom fhirData={telecom} />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </ResourceContainer>
      </div>
    );
  }
}

export default Patient;
