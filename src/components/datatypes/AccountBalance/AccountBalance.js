import React from 'react';
import { Value } from '../../ui';

const AccountBalance = props => {
  const { totalBenefit, totalCost } = props;

  return (
    <div className="fhir-datatype__AccountBalance container-fluid p-0 m-0 ">
      <Value label="Total cost" secondary>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: totalCost.code,
        }).format(Math.round(totalCost.value * 100) / 100)}
      </Value>
      <Value label="Coverd by benefit" secondary>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: totalBenefit.code,
        }).format(Math.round(totalBenefit.value * -1 * 100) / 100)}
      </Value>
      <div class="border-top my-1 row border-secondary" />
      <Value label="Patient Owed" secondary>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: totalBenefit.code,
        }).format(
          Math.round((totalCost.value - totalBenefit.value) * 100) / 100,
        )}
      </Value>
    </div>
  );
};

export default AccountBalance;
