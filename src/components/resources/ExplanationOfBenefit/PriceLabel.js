import React from 'react';
import { parseValueIntoMonetaryValueOfGivenCurrency } from '../../../utils';

const PriceLabel = ({ ...props }) => {
  const { totalCost } = props;

  return (
    <h3
      className="fw-bold fs-2 mb-0 w-90 title-width-sm"
      data-testid="headerPrice"
    >
      {parseValueIntoMonetaryValueOfGivenCurrency(
        totalCost.value,
        totalCost.code,
      )}
    </h3>
  );
};

export default PriceLabel;
