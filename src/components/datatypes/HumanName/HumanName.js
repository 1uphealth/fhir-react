import React from 'react';
import _flatten from 'lodash/flatten';
import _get from 'lodash/get';

const HumanName = ({ fhirData, isTitle, alternative }) => {
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
      {header || alternative}
      {!isTitle && use && <span>{` (${use})`}</span>}
    </>
  );
};

export default HumanName;
