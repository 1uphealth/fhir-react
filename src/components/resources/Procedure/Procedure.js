import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _has from 'lodash/has';

import Coding from '../../datatypes/Coding';
import Annotation from '../../datatypes/Annotation';

const Procedure = props => {
  const { fhirResource } = props;
  const display =
    _get(fhirResource, 'code.coding[0].display') ||
    _get(fhirResource, 'code.text');
  const status = _get(fhirResource, 'status', '');
  const hasPerformedDateTime = _has(fhirResource, 'performedDateTime');
  const performedDateTime = _get(fhirResource, 'performedDateTime');
  const hasCoding = _has(fhirResource, 'code.coding');
  const coding = _get(fhirResource, 'code.coding', []);
  const hasPerformerData = _has(fhirResource, 'performer.0.actor.display');
  const performer = _get(fhirResource, 'performer', []);
  const hasReasonCode = _has(fhirResource, 'reasonCode');
  const reasonCode = _get(fhirResource, 'reasonCode', []);
  const hasNote = _has(fhirResource, 'note');
  const note = _get(fhirResource, 'note', []);
  return (
    <div>
      <div style={{ width: '100%', display: 'inline-block' }}>
        <h4 style={{ display: 'inline-block' }} data-testid="title">
          {display}
        </h4>
        &nbsp;({status}
        {hasPerformedDateTime && (
          <span className="text-muted">, on {performedDateTime}</span>
        )}
        )
      </div>
      {hasCoding && (
        <div className="container">
          <div className="row" data-testid="hasCoding">
            {coding.map((coding, i) => (
              <Coding key={`item-${i}`} fhirData={coding} />
            ))}
          </div>
        </div>
      )}
      {hasPerformerData && (
        <div>
          <label class="sb-heading">Performed the procedure</label>
          {performer.map((item, i) => (
            <div key={`item-${i}`}>{_get(item, 'actor.display', '---')}</div>
          ))}
        </div>
      )}
      {hasReasonCode && (
        <div data-testid="hasReasonCode">
          <label class="sb-heading">Reason procedure performed</label>
          <Annotation fhirData={reasonCode} />
        </div>
      )}
      {hasNote && (
        <div data-testid="hasNote">
          <label class="sb-heading">
            Additional information about the procedure
          </label>
          <Annotation fhirData={note} />
        </div>
      )}
    </div>
  );
};

Procedure.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Procedure;
