import React from 'react';
const _ = require('lodash');
import HumanName from '../datatypes/HumanName';
import Telecom from '../datatypes/Telecom';
import Address from '../datatypes/Address';
import ResourceContainer from '../container/ResourceContainer';
import crypto from 'crypto';

class PatientContact extends React.Component {
  constructor(props) {
    super(props);
    console.log('yeet props:', this.props);
  }
  render() {
    return (
      <div>
        {_.get(this.props.fhirData[0], 'value') ? (
          <Telecom fhirData={this.props.fhirData[0]} />
        ) : (
          <HumanName fhirData={_.get(this.props.fhirData, 'name')} />
        )}
        {_.get(this.props.fhirData[0], 'value') ? (
          ''
        ) : (
          <small className="text-muted">{`(${_.get(
            this.props.fhirData,
            'relationship[0].text'
          ) || ''})`}</small>
        )}
      </div>
    );
  }
}

class Patient extends React.Component {
  constructor(props) {
    super(props);
  }

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
                      <span>
                        <HumanName
                          fhirData={patientName}
                          primary={index === 0}
                        />
                        &nbsp;&nbsp;
                      </span>
                    );
                  }
                }.bind(this)
              )}
              <div>
                {_.get(this.props.fhirResource, 'birthDate') ? (
                  <span className="text-muted">
                    <strong>
                      {_.get(this.props.fhirResource, 'gender')
                        ? `${_.get(this.props.fhirResource, 'gender')},`
                        : ''}{' '}
                      {_.get(this.props.fhirResource, 'birthDate') || ''}
                    </strong>{' '}
                    <small>(DOB)</small>
                  </span>
                ) : (
                  ''
                )}
              </div>
              <div>
                {_.get(this.props.fhirResource, 'identifier[0].value') ? (
                  <span className="text-muted">
                    MRN: {_.get(this.props.fhirResource, 'identifier[0].value')}
                  </span>
                ) : (
                  <span>ID: {_.get(this.props.fhirResource, 'id')}</span>
                )}
              </div>
              {/* Contact Information */}
              <div style={{ paddingTop: '.5rem' }}>
                <small className="text-muted">
                  <strong>CONTACT</strong>
                </small>
                {(_.get(this.props.fhirResource, 'telecom') || []).map(function(
                  telecom
                ) {
                  if (telecom.system === 'phone') {
                    return (
                      <div>
                        <Telecom fhirData={telecom} />
                      </div>
                    );
                  } else if (telecom.system === 'email') {
                    return (
                      <div>
                        <Telecom fhirData={telecom} />
                      </div>
                    );
                  }
                })}
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
          {/* Address Section */}
          <div style={{ paddingTop: '.5rem' }}>
            <small className="text-muted">
              <strong>ADDRESS</strong>
            </small>
            <div>
              <Address
                fhirData={_.get(this.props.fhirResource, 'address[0]')}
              />
            </div>
          </div>
        </ResourceContainer>
      </div>
    );
  }
}

export default Patient;
