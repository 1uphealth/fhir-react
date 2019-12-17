import React from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';
import _has from 'lodash/has';
import Date from '../../datatypes/Date';

const MedicationDetails = props => {
  const { medication, expiration } = props;
  return (
    <div>
      <h5>{medication} </h5>
      <h6>
        <b>Expiration date:</b>
        {expiration}
      </h6>
    </div>
  );
};

const MedicationStatement = props => {
  const { fhirResource } = props;
  const title = _get(
    fhirResource,
    'medicationCodeableConcept.text',
    _get(fhirResource, 'medicationCodeableConcept.coding[0].display'),
  );
  const status = _get(fhirResource, 'status', '');
  const hasStatus = _has(fhirResource, 'status');
  const statusDesc = {
    from: _get(fhirResource, 'effectivePeriod.start'),
    to: _get(fhirResource, 'effectivePeriod.end'),
  };
  const reported =
    _get(fhirResource, 'reported') === true ? ' - self reported' : '';

  const contained = _get(fhirResource, 'contained');
  const hasMedication = Array.isArray(contained);
  const hasDosage = Array.isArray(_get(fhirResource, 'dosage'));
  const reasonCode = _get(fhirResource, 'reasonCode');
  const hasReasonCode = Array.isArray(reasonCode);
  return (
    <div className="col-xs-8">
      <div style={{ width: '100%', display: 'inline-block' }}>
        <h4 style={{ display: 'inline-block' }} data-testid="title">
          {title}
        </h4>
        &nbsp;({status}
        <span className="text-muted" data-testid="status">
          {hasStatus && (
            <>
              , status {status} from <Date fhirData={statusDesc.from} /> to{' '}
              <Date fhirData={statusDesc.to} />
            </>
          )}
        </span>
        <span>{reported}</span>)
      </div>
      {hasMedication && (
        <div className="row">
          {contained.map((medication, i) => {
            const hasMedicationDetails = _has(
              medication,
              'code.coding[0].display',
            );
            if (hasMedicationDetails) {
              return (
                <MedicationDetails
                  key={`item-${i}`}
                  medication={_get(medication, 'code.coding[0].display')}
                  expiration={_get(
                    medication,
                    'package.batch[0].expirationDate',
                  )}
                />
              );
            }
            return null;
          })}
        </div>
      )}
      {hasReasonCode && (
        <div>
          {reasonCode.map((reasonCode, i) => {
            const display = _get(reasonCode, '.coding[0].display');
            if (display) {
              return (
                <p key={`reasonCode-${i}`}>
                  <b>Reason:</b> {display}
                </p>
              );
            }
            return null;
          })}
        </div>
      )}
      {hasDosage && (
        <div data-testid="dosage">
          {fhirResource.dosage.map((dosage, i) => {
            const text = _get(dosage, 'text');
            const additionalInstructionText = _get(
              dosage,
              'additionalInstruction[0].text',
            );
            const route = _get(dosage, 'route.coding[0].display');
            return (
              <blockquote key={`dosage-${i}`} className="m-3">
                <p>
                  <b>Dosage Instruction:</b> {text}
                </p>
                {additionalInstructionText && (
                  <p>
                    <b>Additional Instruction:</b>
                    {additionalInstructionText}
                  </p>
                )}
                {route && (
                  <p>
                    <b>Route:</b> {route}
                  </p>
                )}
              </blockquote>
            );
          })}
        </div>
      )}
    </div>
  );
};

MedicationStatement.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default MedicationStatement;
