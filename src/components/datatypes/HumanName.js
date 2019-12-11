import React from 'react';
import _get from 'lodash/get';
import _flatten from 'lodash/flatten';

function HumanName(props) {
  const { fhirData, primary } = props;
  const givenName = _get(fhirData, 'given', []).join(', ');
  const familyName = _flatten(Array(_get(fhirData, 'family', ''))).join(', ');
  const suffix = _get(fhirData, 'suffix', []).join(' ');
  const use = _get(fhirData, 'use');
  const header = `${givenName} ${familyName} ${suffix}`;

  const headerElement = primary ? (
    <h4 style={{ display: 'inline-block' }}>{header}</h4>
  ) : (
    <strong>{header}</strong>
  );
  const rootClassName = primary ? '' : 'text-muted';

  return (
    <span className={rootClassName}>
      {headerElement}
      {use && <small>&nbsp;({use})</small>}
    </span>
  );
}

export default HumanName;
