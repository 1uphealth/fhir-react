import React from 'react';
import ResourceContainer from '../../container/ResourceContainer';
import Reference from '../../datatypes/Reference';
var _ = require('lodash');

function Condition(props) {
  const { fhirResource } = props;
  const codeCodingDisplay = _.get(fhirResource, 'code.coding.0.display');
  const codeText = _.get(fhirResource, 'code.text');
  const severityText = _.get(fhirResource, 'severity.text');
  const clinicalStatus = _.get(fhirResource, 'clinicalStatus');
  const onsetDateTime = _.get(fhirResource, 'onsetDateTime');
  const dateRecorded = _.get(fhirResource, 'dateRecorded');
  const asserter = _.get(fhirResource, 'asserter');

  return (
    <div>
      <ResourceContainer {...props}>
        <div>
          <h4 style={{ display: 'inline-block' }}>
            {codeCodingDisplay || codeText || ''}
          </h4>
          &nbsp;(
          <span data-testid="clinical-status">{clinicalStatus || ''}</span>
          <span className="text-muted" data-testid="severity">
            {severityText && `, ${severityText} severity`}
          </span>
          )
        </div>
        <div className="row pl-0 pr-0">
          <div className="col-md-12">
            {onsetDateTime && (
              <div>
                <small className="text-muted text-uppercase">
                  <strong>Onset Date:</strong>
                </small>{' '}
                {onsetDateTime}
              </div>
            )}
          </div>
          <div className="col-md-12">
            {dateRecorded && (
              <div>
                <small className="text-muted text-uppercase">
                  <strong>Date recorded:</strong>
                </small>{' '}
                {dateRecorded}
              </div>
            )}
          </div>
          <div className="col-md-12">
            {asserter && (
              <div>
                <small className="text-muted text-uppercase">
                  <strong>Asserted by:</strong>
                </small>{' '}
                {<Reference fhirData={asserter} />}
              </div>
            )}
          </div>
        </div>
      </ResourceContainer>
    </div>
  );
}

export default Condition;
