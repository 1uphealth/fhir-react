import React from 'react';

import _get from 'lodash/get';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import ObservationGraph from './ObservationGraph';

const Observation = props => {
  const { fhirResource } = props;
  const { issued } = fhirResource;
  const codeCodingDisplay = _get(fhirResource, 'code.coding.0.display');
  const codeText = _get(fhirResource, 'code.text', '');
  const valueQuantityValue = _get(fhirResource, 'valueQuantity.value', '');
  const valueQuantityUnit = _get(fhirResource, 'valueQuantity.unit', '');
  const status = _get(fhirResource, 'status', '');
  const valueCodeableConceptText = _get(
    fhirResource,
    'valueCodeableConcept.text',
  );
  const valueCodeableConceptCodingDisplay = _get(
    fhirResource,
    'valueCodeableConcept.coding[0].display',
  );
  const valueCodeableConceptCoding = _get(
    fhirResource,
    'valueCodeableConcept.coding',
    [],
  );
  return (
    <div>
      <div style={{ width: '100%', display: 'inline-block' }}>
        <h4 style={{ display: 'inline-block' }}>
          {codeCodingDisplay || codeText} &nbsp;
          <code>
            {valueQuantityValue}
            {valueQuantityUnit}
          </code>
        </h4>
        &nbsp;({status}&nbsp;
        <span className="text-muted">
          {valueCodeableConceptText || valueCodeableConceptCodingDisplay}
        </span>
        )
      </div>
      <div className="container">
        <div className="row">
          <ObservationGraph
            valueQuantity={fhirResource.valueQuantity}
            referenceRange={fhirResource.referenceRange}
          />
        </div>
        {issued && (
          <div className="row" style={{ display: 'unset !important' }}>
            <small className="text-muted text-uppercase">
              <strong>Issued on:</strong>
            </small>
            &nbsp;
            <Date fhirData={issued} />
          </div>
        )}
        <div className="row">
          {valueCodeableConceptCoding.map(coding => (
            <Coding fhirData={coding} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Observation;
