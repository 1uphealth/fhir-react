import React from 'react';
import { render } from '@testing-library/react';

import ResearchStudy from './ResearchStudy';
import fhirVersions from '../fhirResourceVersions';
import stu3Example1 from '../../../fixtures/stu3/resources/researchStudy/example-1.json';
import { nbspRegex } from '../../../testUtils';

describe('should render ResearchStudy component properly', () => {
  it('with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };

    const { getByTestId } = render(<ResearchStudy {...defaultProps} />);

    expect(getByTestId('title').textContent).toEqual('Example study');
    expect(getByTestId('status').textContent).toEqual('completed');
    expect(getByTestId('category').textContent.replace(nbspRegex, ' ')).toEqual(
      'Gene expression (GENE)',
    );
    expect(getByTestId('focus').textContent.replace(nbspRegex, ' ')).toEqual(
      'Prostate cancer (PRC)',
    );
    expect(getByTestId('protocol').textContent).toEqual('PlanDefinition/pdf1');
    expect(getByTestId('partOf').textContent).toEqual('ResearchStudy/rsd1');
  });
});
