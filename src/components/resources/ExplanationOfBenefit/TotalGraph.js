import React from 'react';

import { Value } from '../../ui/index';
import { ValueSection } from '../../ui/index';
import ExplanationOfBenefitGraph from '../ExplanationOfBenefitGraph/ExplanationOfBenefitGraph';
import { parseValueIntoMonetaryValueOfGivenCurrency } from '../../../utils';

const TotalGraph = ({ fhirData }) => {
  const { totalCost, totalBenefit } = fhirData;

  // currently supported format: STU3
  const getChartData = () => {
    if (totalCost && totalBenefit) {
      return [
        {
          id: 'planDiscount',
          label: 'Plan discount',
          value: totalBenefit.value,
          color: '#3498DB',
        },
        {
          id: 'youPaid',
          label: 'You paid',
          value: totalCost.value - totalBenefit.value,
          color: '#17A589',
        },
      ];
    }
  };

  return (
    <ValueSection label="Total" data-testid="total">
      <div className="bg-light my-4 py-2 d-flex flex-column flex-sm-row">
        <div className="graph-width-sm">
          <ExplanationOfBenefitGraph
            pieChartProperties={{ isInteractive: false }}
            data={getChartData({ totalCost, totalBenefit })}
            margin={{ top: 20, bottom: 20 }}
          />
        </div>
        <div className="my-sm-auto">
          <div className="row justify-content-center">
            {getChartData({ totalCost, totalBenefit }).map(item => (
              <div
                style={{ minWidth: 160 }}
                className="d-flex mb-2 px-3 w-auto"
              >
                <span
                  className="me-2 rounded-pill mt-3 mb-2 my-sm-0"
                  style={{ width: 4, background: item.color }}
                />
                <Value dirColumn label={item.label} data-testid={item.id}>
                  {parseValueIntoMonetaryValueOfGivenCurrency(
                    item.value,
                    totalBenefit.code,
                  )}
                </Value>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ValueSection>
  );
};

export default TotalGraph;
