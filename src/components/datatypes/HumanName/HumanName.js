import React from 'react';
import _get from 'lodash/get';
import _flatten from 'lodash/flatten';

import './HumanName.css';

function HumanName(props) {
  const { fhirData, primary } = props;
  const givenName = _get(fhirData, 'given', []).join(', ');
  const familyName = _flatten(Array(_get(fhirData, 'family', ''))).join(', ');
  const suffix = _get(fhirData, 'suffix', []).join(' ');
  const textName = _get(fhirData, 'text');
  const use = _get(fhirData, 'use');
  const header = textName
    ? textName
    : `${givenName} ${familyName} ${suffix}`.trim();

  const headerElement = primary ? (
    <span className="fhir-datatype__HumanName__Header--primary">{header}</span>
  ) : (
    <span className="fhir-datatype__HumanName__Header--default">{header}</span>
  );
  const rootClassName = primary
    ? ''
    : 'fhir-datatype__HumanName__not-primary-block';

  return (
    <div className={`fhir-datatype__HumanName ${rootClassName}`}>
      {headerElement}
      {use && (
        <small className="fhir-datatype__HumanName__use-block">
          {` (${use})`}
        </small>
      )}
    </div>
  );
}

export default HumanName;
