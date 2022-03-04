import React from 'react';
import { render } from '@testing-library/react';
import RelatedPerson from './RelatedPerson';
import fhirVersions from '../fhirResourceVersions';

import example1 from '../../../fixtures/dstu2/resources/relatedPerson/example1.json';
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

    expect(getByTestId('gender').textContent).toEqual('male');
    expect(getByTestId('birthDate').textContent).toEqual('1990-09-15');
    expect(getByTestId('address').textContent).toEqual(
      'Abc Defg23KANSAS CITY, MO 64116 US',
    );
    expect(getByTestId('telephone').textContent).toEqual(
      '8033333333' +
        '8168888888' +
        '8168888882' +
        '5012889406' +
        '18011111111' +
        '8168888881',
    );
  });
});
