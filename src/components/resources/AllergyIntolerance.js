import React from 'react';
const _ = require('lodash');
import ResourceContainer from '../container/ResourceContainer';
import Reference from '../datatypes/Reference';
import Coding from '../datatypes/Coding';

class AllergyIntolerance extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ResourceContainer {...this.props}>
          <div style={{ width: '100%' }}>
            <h4 style={{ overflowWrap: 'break-word' }}>
              {_.get(this.props.fhirResource, 'substance.coding[0].display') ||
                _.get(this.props.fhirResource, 'substance.text') ||
                ''}
            </h4>
            &nbsp;
            {typeof _.get(this.props.fhirResource, 'recordedDate') ===
            'undefined'
              ? ''
              : `(${_.get(this.props.fhirResource, 'status')}`}
            <span className="text-muted">
              {typeof _.get(this.props.fhirResource, 'recordedDate') ===
              'undefined'
                ? ''
                : `, recorded on ${_.get(
                    this.props.fhirResource,
                    'recordedDate'
                  )})`}
            </span>
          </div>
          <div>
            <div className="">
              <div className="">
                <Coding
                  fhirData={_.get(
                    this.props.fhirResource,
                    'substance.coding[0]'
                  )}
                />
              </div>
            </div>
            <div className="">
              {typeof _.get(this.props.fhirResource, 'reaction') ===
              'undefined' ? (
                ''
              ) : (
                <div className="">
                  <small className="text-muted text-uppercase">
                    <strong>Manifestation</strong>
                  </small>
                </div>
              )}
              <div className="">
                {typeof _.get(this.props.fhirResource, 'reaction') ===
                'undefined'
                  ? ''
                  : _.get(this.props.fhirResource, 'reaction').map(function(
                      reaction
                    ) {
                      return (_.get(reaction, 'manifestation') || []).map(
                        function(manifestation) {
                          return (_.get(manifestation, 'coding') || []).map(
                            function(coding, index) {
                              return (
                                <div key={index}>
                                  <Coding fhirData={coding} />
                                  {typeof _.get(reaction, 'severity') ===
                                  'undefined' ? (
                                    ''
                                  ) : (
                                    <span>
                                      {_.get(reaction, 'severity')} severity
                                    </span>
                                  )}
                                </div>
                              );
                            }
                          );
                        }
                      );
                    })}
              </div>
            </div>
            <div className="">
              <div className="">
                {_.get(this.props.fhirResource, 'asserter') ? (
                  <div>
                    <small className="text-muted text-uppercase">
                      <strong>Asserted by:</strong>
                    </small>{' '}
                    {(
                      <Reference
                        fhirData={_.get(this.props.fhirResource, 'asserter')}
                      />
                    ) || ''}
                  </div>
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

export default AllergyIntolerance;
