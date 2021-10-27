import React from 'react';
import _get from 'lodash/get';
import _flatten from 'lodash/flatten';

import './HumanName.css';

function HumanName(props) {
  const { fhirData, isTitle } = props;
  const givenName = _get(fhirData, 'given', []).join(', ');
  const familyName = _flatten(Array(_get(fhirData, 'family', ''))).join(', ');
  const suffix = _get(fhirData, 'suffix', []).join(' ');
  const textName = _get(fhirData, 'text');
  const use = _get(fhirData, 'use');
  const header = textName
    ? textName
    : `${givenName} ${familyName} ${suffix}`.trim();

  return (
    <>
      {header}
      {!isTitle && <span>{` (${use})`}</span>}
    </>
  );
}

export default HumanName;
