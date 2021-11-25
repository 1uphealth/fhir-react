import React from 'react';

import { Value } from '../../ui/index';
import { ValueSection } from '../../ui/index';
import ExplanationOfBenefitGraph from '../ExplanationOfBenefitGraph/ExplanationOfBenefitGraph';
import { parseValueIntoMonetaryValueOfGivenCurrency } from '../../../utils';

const TotalGraph = ({ fhirData }) => {
  const { totalCost, totalBenefit } = fhirData;

  // - Currently supported format: STU3
  // - Graph legend was adjusted to multiple chart items
  const getChartData = () => {
    if (totalCost && totalBenefit) {
      return [
        {
          id: 'Plan discount',
          label: 'Plan discount',
          value: totalBenefit.value,
          color: '#3498DB',
        },
        {
          id: 'You paid',
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
        <div style={{ width: 200 }}>
          <ExplanationOfBenefitGraph
            pieChartProperties={{ isInteractive: false }}
            data={getChartData({ totalCost, totalBenefit })}
            margin={{ top: 20, bottom: 20 }}
          />
        </div>
        <div className="my-sm-auto">
          <div className="row">
            {getChartData({ totalCost, totalBenefit }).map(item => (
              <div
                style={{ minWidth: 'fit-content' }}
                className="d-flex flex-row col-12 col-sm-3 col-lg-2 mb-2 px-3 "
              >
                <span
                  className="p-1 me-2 rounded-pill"
                  style={{ background: item.color }}
                />
                <Value
                  dirColumn
                  label={item.label}
                  data-testid={item.label.toLowerCase()}
                >
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
