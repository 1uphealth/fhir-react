import React from 'react';
import { Value } from '../../ui';

const AccountBalance = props => {
  const { totalBenefit, totalCost } = props;

  const parseValueIntoMonetaryValueOfGivenCurrency = (value, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(Math.round(value * 100) / 100);
  };

  return (
    <div className="fhir-datatype__AccountBalance container-fluid p-0 m-0 ">
      <Value label="Total cost" data-testid="totalCost" secondary>
        {parseValueIntoMonetaryValueOfGivenCurrency(
          totalCost.value,
          totalCost.code,
        )}
      </Value>
      <Value label="Coverd by benefit" data-testid="totalBenefit" secondary>
        {parseValueIntoMonetaryValueOfGivenCurrency(
          totalBenefit.value * -1,
          totalBenefit.code,
        )}
      </Value>
      <div className="border-top my-1 row border-secondary" />
      <Value label="Patient Owed" secondary>
        {parseValueIntoMonetaryValueOfGivenCurrency(
          totalCost.value - totalBenefit.value,
          totalBenefit.code,
        )}
      </Value>
    </div>
  );
};

export default AccountBalance;
