import React from 'react';
import HumanName from '../datatypes/HumanName';
import ResourceContainer from '../container/ResourceContainer';
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
                  .digest('hex')}?s=30&r=any&default=identicon&forcedefault=1`}
                alt=""
              />
              &nbsp;
            </div>
            <div className="col-xs-8">
              <span>
                <HumanName
                  fhirData={_.get(this.props.fhirResource, 'name')}
                  primary={true}
                />
                &nbsp;&nbsp;
              </span>
              <div>
                <span className="text-muted">
                  gender{' '}
                  <strong>
                    {_.get(this.props.fhirResource, 'gender') || ''}
                    {_.get(this.props.fhirResource, 'active') === true
                      ? ', active (status)'
                      : ''}
                  </strong>
                </span>
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
        </ResourceContainer>
      </div>
    );
  }
}

export default Patient;
