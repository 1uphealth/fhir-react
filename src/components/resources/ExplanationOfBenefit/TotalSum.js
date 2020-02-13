import React from 'react';
import CodeableConcept from '../../datatypes/CodeableConcept';
import Money from '../../datatypes/Money';

const TotalSum = ({ fhirData }) => {
  return fhirData.map(({ category, amount }, index) => (
    <div key={`total-${index}`}>
      <CodeableConcept fhirData={category} />
      <Money fhirData={amount} />
    </div>
  ));
};

export default TotalSum;
