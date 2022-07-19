import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import AllergyIntolerance from './AllergyIntolerance';

import exampleAllergyIntoleranceDSTU2 from '../../../fixtures/dstu2/resources/allergyIntolerance/example1.json';
import exampleAllergyIntoleranceSTU3 from '../../../fixtures/stu3/resources/allergyIntolerance/example1.json';
import exampleAllergyIntoleranceR4 from '../../../fixtures/r4/resources/allergyIntolerance/example1.json';
import example2AllergyIntoleranceR4 from '../../../fixtures/r4/resources/allergyIntolerance/example3.json';
import fhirVersions from '../fhirResourceVersions';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render component correctly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirResource: exampleAllergyIntoleranceDSTU2,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { getByAltText } = render(<AllergyIntolerance {...defaultProps} />);
    const headerIcon = getByAltText('allergy intolerance');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirResource: exampleAllergyIntoleranceDSTU2,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: false,
    };

    const { getByTestId } = render(<AllergyIntolerance {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: exampleAllergyIntoleranceDSTU2,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: (
        <img
          src={require('../assets/containers/AllergyIntolerance/allergy-intolerance.svg')}
          alt="allergy intolerance"
        />
      ),
    };

    const { getByAltText } = render(<AllergyIntolerance {...defaultProps} />);
    const headerIcon = getByAltText('allergy intolerance');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: exampleAllergyIntoleranceDSTU2,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<AllergyIntolerance {...defaultProps} />);
    const headerIcon = getByAltText('allergy intolerance');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirResource: exampleAllergyIntoleranceDSTU2,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<AllergyIntolerance {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });
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

    expect(getByTestId('recordedDate').textContent).toContain('03/01/2010');

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

    expect(getByTestId('recordedDate').textContent).toContain(
      'recorded on 06/12/2012',
    );

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

    expect(getByTestId('recordedDate').textContent).toContain(
      'recorded on 06/12/2012',
    );

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

    expect(getByTestId('recordedDate').textContent).toContain('08/06/2015');

    expect(getByTestId('patient').textContent).toEqual('Patient/mom');

    expect(queryByTestId('substance')).toBeNull();

    expect(queryByTestId('manifestation')).toBeNull();

    expect(queryByTestId('hasNote')).toBeNull();

    expect(queryByTestId('type')).toBeNull();

    expect(queryByTestId('category')).toBeNull();

    expect(queryByTestId('asserter')).toBeNull();
  });

  it('should fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: example2AllergyIntoleranceR4,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = jest.fn();
    const { getByRole } = render(
      <AllergyIntolerance {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).not.toEqual('collapse');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: example2AllergyIntoleranceR4,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = 'test';
    const { getByRole } = render(
      <AllergyIntolerance {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
