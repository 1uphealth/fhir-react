import React from 'react';
import ResourceContainer from '../container/ResourceContainer';
import Reference from '../datatypes/Reference';
import Coding from '../datatypes/Coding';
var _ = require('lodash');

class AllergyIntolerance extends React.Component {
  render() {
    return (
      <div>
        <ResourceContainer {...this.props}>
          <div style={{ width: '100%', display: 'inline-block' }}>
            <h4 style={{ display: 'inline-block' }}>
              {_.get(this.props.fhirResource, 'substance.coding[0].display') ||
                _.get(this.props.fhirResource, 'substance.text') ||
                ''}
            </h4>
            &nbsp;({_.get(this.props.fhirResource, 'status') || ''}
            <span className="text-muted">
              {typeof _.get(this.props.fhirResource, 'recordedDate') ===
              'undefined'
                ? ''
                : `, recorded on ${_.get(
                    this.props.fhirResource,
                    'recordedDate',
                  )}`}
            </span>
            )
          </div>
          <div className="container pl-0 pr-0">
            <div className="row pl-0 pr-0">
              <div className="col-12">
                <Coding
                  fhirData={_.get(
                    this.props.fhirResource,
                    'substance.coding[0]',
                  )}
                />
              </div>
            </div>
            <div className="row pl-0 pr-0">
              <div className="col-12">
                <small className="text-muted text-uppercase">
                  <strong>Manifestation</strong>
                </small>
              </div>
              <br />
              <div className="col-12">
                {typeof _.get(this.props.fhirResource, 'reaction') ===
                'undefined'
                  ? ''
                  : _.get(this.props.fhirResource, 'reaction').map(function(
                      reaction,
                    ) {
                      return (_.get(reaction, 'manifestation') || []).map(
                        function(manifestation) {
                          return (_.get(manifestation, 'coding') || []).map(
                            function(coding) {
                              return (
                                <div>
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
                            },
                          );
                        },
                      );
                    })}
              </div>
            </div>
            <div className="row">
              <div className="col-12-sm">
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
