import React from 'react';
import PropTypes from 'prop-types';

import Reference from '../../datatypes/Reference';
import _get from 'lodash/get';
import _has from 'lodash/has';
import CodeableConcept from '../../datatypes/CodeableConcept';

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
  const hasAsserter = _has(fhirResource, 'asserter');
  const asserter = _get(fhirResource, 'asserter');
  const hasBodySite = _get(fhirResource, 'bodySite.0.coding.0.display');
  const bodySite = _get(fhirResource, 'bodySite');

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
            <div data-testid="onsetDate">
              <label className="text-muted text-uppercase">
                <strong>Onset Date: </strong>
              </label>
              {onsetDateTime}
            </div>
          )}
        </div>
        <div className="col-md-12">
          {dateRecorded && (
            <div data-testid="dateRecorded">
              <label className="text-muted text-uppercase">
                <strong>Date recorded: </strong>
              </label>
              {dateRecorded}
            </div>
          )}
        </div>
        {hasAsserter && (
          <div className="col-md-12">
            <div data-testid="asserter">
              <label className="text-muted text-uppercase">
                <strong>Asserted by: </strong>
              </label>
              <Reference fhirData={asserter} />
            </div>
          </div>
        )}
        {hasBodySite && (
          <div className="col-md-12">
            <div data-testid="bodySite">
              <label className="text-muted text-uppercase">
                <strong>Anatomical locations:</strong>
              </label>
              <CodeableConcept fhirData={bodySite} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Condition.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Condition;
