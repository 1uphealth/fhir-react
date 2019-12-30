import React from 'react';
import { render } from '@testing-library/react';
import AllergyIntolerance from './AllergyIntolerance';

import exampleAllergyIntoleranceDSTU2 from '../../../fixtures/dstu2/resources/allergyIntolerance/example1.json';
import exampleAllergyIntoleranceSTU3 from '../../../fixtures/stu3/resources/allergyIntolerance/example1.json';

describe('should render component correctly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: exampleAllergyIntoleranceDSTU2,
      fhirVersion: 'dstu2',
    };
    const { getByTestId } = render(<AllergyIntolerance {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain('ALLERGENIC EXTRACT');

    expect(getByTestId('status').textContent).toContain('unconfirmed');

    expect(getByTestId('recordedDate').textContent).toContain('2010-03-01');

    expect(getByTestId('substance').textContent).toContain('PENICILLIN');

    expect(getByTestId('manifestation').textContent).toContain('Hives');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: exampleAllergyIntoleranceSTU3,
      fhirVersion: 'stu3',
    };
    const { getByTestId } = render(<AllergyIntolerance {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain('Cashew nuts');

    expect(getByTestId('status').textContent).toContain('confirmed');

    expect(getByTestId('recordedDate').textContent).toContain('2014-10-09');

    expect(getByTestId('substance').textContent).toContain(
      'allergenic extract',
    );

    expect(getByTestId('manifestation').textContent).toContain(
      'Anaphylactic reaction',
    );

    expect(getByTestId('hasNote').textContent).toContain(
      'NotesThe criticality',
    );
  });
});
