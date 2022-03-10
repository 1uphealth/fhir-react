import React from 'react';
import { render } from '@testing-library/react';
import RelatedPerson from './RelatedPerson';
import fhirVersions from '../fhirResourceVersions';

import example1 from '../../../fixtures/dstu2/resources/relatedPerson/example1.json';
import example2 from '../../../fixtures/stu3/resources/relatedPerson/example1.json';
import example3 from '../../../fixtures/r4/resources/relatedPerson/example1.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render component correctly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirResource: example1,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { getByAltText } = render(<RelatedPerson {...defaultProps} />);
    const headerIcon = getByAltText('related person');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirResource: example1,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: false,
    };

    const { getByTestId } = render(<RelatedPerson {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: example1,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: (
        <img
          src={require('../assets/containers/RelatedPerson/related-person.svg')}
          alt="related person"
        />
      ),
    };

    const { getByAltText } = render(<RelatedPerson {...defaultProps} />);
    const headerIcon = getByAltText('related person');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: example1,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<RelatedPerson {...defaultProps} />);
    const headerIcon = getByAltText('related person');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirResource: example1,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<RelatedPerson {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: example1,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId } = render(<RelatedPerson {...defaultProps} />);

    expect(getByTestId('address').textContent).toEqual(
      '43, Place du Marché Sainte CatherineParis,  75004 FRA',
    );
    expect(getByTestId('telephone').textContent).toEqual('+33 (237) 998327');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: example2,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<RelatedPerson {...defaultProps} />);

    expect(getByTestId('gender').textContent).toEqual('female');
    expect(getByTestId('birthDate').textContent).toEqual('1963');
    expect(getByTestId('telephone').textContent).toEqual('+31201234567');
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: example3,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId } = render(<RelatedPerson {...defaultProps} />);

    expect(getByTestId('gender').textContent).toEqual('female');
    expect(getByTestId('birthDate').textContent).toEqual('1973-05-31');
    expect(getByTestId('address').textContent).toEqual('2222 Home Street   ');
    expect(getByTestId('telephone').textContent).toEqual('555-555-2003');
  });
});
