import React from 'react';
import { render } from '@testing-library/react';

import Immunization from './Immunization';
import dstu2Example from '../../../fixtures/dstu2/resources/immunization/example1.json';

describe('should render Immunization component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example,
    };

    const { container, getByTestId } = render(
      <Immunization {...defaultProps} />,
    );

    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Fluvax');

    expect(getByTestId('providedDate').textContent).toContain('on 2013-01-10');

    expect(getByTestId('lotNumber').textContent).toContain('AAJN11K');
    expect(getByTestId('lotNumberExpirationDate').textContent).toContain(
      '2015-02-15',
    );

    expect(getByTestId('doseQuantity').textContent).toContain('5');

    expect(getByTestId('requester').textContent).toContain(
      'Practitioner/example',
    );

    expect(getByTestId('performer').textContent).toContain(
      'Practitioner/example',
    );

    expect(getByTestId('route').textContent).toContain('intramuscular');

    expect(getByTestId('site').textContent).toContain('left arm');
  });
});
