import React from 'react';

import ExplanationOfBenefitGraph from './ExplanationOfBenefitGraph';

export default { title: 'ExplanationOfBenefitGraph' };

export const DefaultExplanationOfBenefitGraph = () => {
  return (
    <ExplanationOfBenefitGraph
      data={[
        {
          id: 'a',
          label: 'a',
          value: 35,
          color: 'hsl(166, 70%, 50%)',
        },
        {
          id: 'b',
          label: 'b',
          value: 200,
          color: 'hsl(101, 70%, 50%)',
        },
        {
          id: 'c',
          label: 'c',
          value: 76,
          color: 'hsl(121, 70%, 50%)',
        },
        {
          id: 'd',
          label: 'd',
          value: 76,
          color: 'hsl(76, 70%, 50%)',
        },
      ]}
    />
  );
};
