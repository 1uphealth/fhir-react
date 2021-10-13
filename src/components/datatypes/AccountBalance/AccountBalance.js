import React from 'react';
import { Value } from '../../ui';

const AccountBalance = props => {
  const { total, hasTotal, totalBenefit, totalCost } = props;

  return (
    <div className="fhir-datatype__AccountBalance container-fluid p-0 m-0 ">
      <Value label="Total cost" secondary>
        ${Math.round(totalCost.value * 100) / 100}
      </Value>
      <Value label="Coverd by benefit" secondary>
        - ${totalBenefit.value}
      </Value>
      <div class="border-top my-1" />
      <Value label="Patient Owed" secondary>
        ${Math.round((totalCost.value - totalBenefit.value) * 100) / 100}
      </Value>
    </div>
  );
};

export default AccountBalance;
