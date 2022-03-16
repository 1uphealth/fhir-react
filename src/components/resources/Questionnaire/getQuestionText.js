import _get from 'lodash/get';
import Coding from '../../datatypes/Coding';
import React from 'react';

export const getQuestionText = item => {
  let text = _get(item, 'text');
  if (!text) {
    // DSTU2
    const groupConcept = _get(item, 'concept.0');
    if (groupConcept) {
      text = <Coding fhirData={groupConcept} />;
    }
    // STU3 & R4
    const groupCode = _get(item, 'code.0');
    if (!text && groupCode) {
      text = <Coding fhirData={groupCode} />;
    }
  }
  return text;
};
