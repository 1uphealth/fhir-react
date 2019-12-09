import React from 'react';
import Reference from '../../datatypes/Reference';
import _get from 'lodash/get';

function Condition(props) {
  const { fhirResource } = props;
  const codeText =
    _get(fhirResource, 'code.coding.0.display') ||
    _get(fhirResource, 'code.text') ||
    _get(fhirResource, 'code.coding.0.code');
  const severityText =
    _get(fhirResource, 'severity.coding.0.display') ||
    _get(fhirResource, 'severity.text');
  const clinicalStatus = _get(fhirResource, 'clinicalStatus');
  const onsetDateTime = _get(fhirResource, 'onsetDateTime');
  const dateRecorded = _get(fhirResource, 'dateRecorded');
  const asserter = _get(fhirResource, 'asserter');

  return (
    <div>
      <div>
        <h4 style={{ display: 'inline-block' }}>{codeText || ''}</h4>
        &nbsp;(
        <span data-testid="clinicalStatus">{clinicalStatus || ''}</span>
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
    </div>
  );
}

export default Condition;
