import React from 'react';
import { render } from '@testing-library/react';
import AllergyIntolerance from './AllergyIntolerance';

import exampleAllergyIntoleranceDSTU2 from '../../../fixtures/dstu2/resources/allergyIntolerance/example1.json';
import exampleAllergyIntoleranceSTU3 from '../../../fixtures/stu3/resources/allergyIntolerance/example1.json';
import exampleAllergyIntoleranceR4 from '../../../fixtures/r4/resources/allergyIntolerance/example1.json';
import example2AllergyIntoleranceR4 from '../../../fixtures/r4/resources/allergyIntolerance/example3.json';
import fhirVersions from '../fhirResourceVersions';

describe('should render component correctly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: exampleAllergyIntoleranceDSTU2,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId, queryByTestId } = render(
      <AllergyIntolerance {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toContain('ALLERGENIC EXTRACT');

    expect(getByTestId('status').textContent).toContain('unconfirmed');

    expect(getByTestId('recordedDate').textContent).toContain('2010-03-01');

    expect(getByTestId('substance').textContent).toContain('PENICILLIN');

    expect(getByTestId('manifestation').textContent).toContain('Hives');

    expect(queryByTestId('type')).toBeNull();

    expect(getByTestId('category').textContent).toEqual('medication');

    expect(getByTestId('patient').textContent).toEqual('Patient/example');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: exampleAllergyIntoleranceSTU3,
      fhirVersion: fhirVersions.STU3,
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

    expect(getByTestId('hasNote').textContent).toContain('The criticality');

    expect(getByTestId('type').textContent).toEqual('allergy');

    expect(getByTestId('category').textContent).toEqual('food');

    expect(getByTestId('patient').textContent).toEqual('Patient/example');

    expect(getByTestId('asserter').textContent).toEqual('Patient/example');
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: exampleAllergyIntoleranceR4,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId } = render(<AllergyIntolerance {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain('Cashew nuts');

    expect(getByTestId('status').textContent).toContain('Confirmed');

    expect(getByTestId('recordedDate').textContent).toContain('2014-10-09');

    expect(getByTestId('substance').textContent).toContain(
      'allergenic extract',
    );

    expect(getByTestId('manifestation').textContent).toContain(
      'Anaphylactic reaction',
    );

    expect(getByTestId('hasNote').textContent).toContain('The criticality');

    expect(getByTestId('type').textContent).toEqual('allergy');

    expect(getByTestId('category').textContent).toEqual('food');

    expect(getByTestId('patient').textContent).toEqual('Patient/example');

    expect(getByTestId('asserter').textContent).toEqual('Patient/example');
  });

  it('should render with no known allergy R4', () => {
    const defaultProps = {
      fhirResource: example2AllergyIntoleranceR4,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId, queryByTestId } = render(
      <AllergyIntolerance {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toContain(
      'No Known Allergy (situation)',
    );

    expect(getByTestId('status').textContent).toContain('Confirmed');

    expect(getByTestId('recordedDate').textContent).toContain('2015-08-06');

    expect(getByTestId('patient').textContent).toEqual('Patient/mom');

    expect(queryByTestId('substance')).toBeNull();

    expect(queryByTestId('manifestation')).toBeNull();

    expect(queryByTestId('hasNote')).toBeNull();

    expect(queryByTestId('type')).toBeNull();

    expect(queryByTestId('category')).toBeNull();

    expect(queryByTestId('asserter')).toBeNull();
  });
});
