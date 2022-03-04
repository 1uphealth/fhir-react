import React from 'react';
import { render } from '@testing-library/react';
import RelatedPerson from './RelatedPerson';

import exampleRelatedPerson from '../../../fixtures/dstu2/resources/RelatedPerson/example.json';
import exampleRelatedPersonSTU3 from '../../../fixtures/stu3/resources/RelatedPerson/example.json';
import example2RelatedPersonSTU3 from '../../../fixtures/stu3/resources/RelatedPerson/example2.json';
import example1RelatedPersonR4 from '../../../fixtures/r4/resources/RelatedPerson/example1.json';
import example3RelatedPersonR4 from '../../../fixtures/r4/resources/RelatedPerson/example3.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render component correctly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirResource: exampleRelatedPerson,
    };

    const { getByAltText } = render(<RelatedPerson {...defaultProps} />);
    const headerIcon = getByAltText('RelatedPerson');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirResource: exampleRelatedPerson,
      fhirIcons: false,
    };

    const { getByTestId } = render(<RelatedPerson {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: exampleRelatedPerson,
      fhirIcons: (
        <img
          src={require('../assets/containers/ExplanationOfBenefit/explanation-of-benefit.svg.svg')}
          alt="RelatedPerson"
        />
      ),
    };

    const { getByAltText } = render(<RelatedPerson {...defaultProps} />);
    const headerIcon = getByAltText('RelatedPerson');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: exampleRelatedPerson,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<RelatedPerson {...defaultProps} />);
    const headerIcon = getByAltText('RelatedPerson');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirResource: exampleRelatedPerson,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<RelatedPerson {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('DSTU2', () => {
    const defaultProps = {
      fhirResource: exampleRelatedPerson,
    };
    const { getByTestId, queryByTestId } = render(
      <RelatedPerson {...defaultProps} />,
    );

    expect(
      getByTestId('RelatedPersonName').textContent.replace(/\s+/g, ' '),
    ).toEqual('Jason Argonaut (usual)');
    expect(getByTestId('RelatedPersonGender').textContent).toEqual('male');
    expect(getByTestId('RelatedPersonBirthDate').textContent).toEqual(
      '1985-08-01',
    );
    expect(getByTestId('RelatedPersonAddress').textContent).toEqual(
      '1979 Milky Way Dr.Verona, WI 53593 US',
    );
    expect(getByTestId('RelatedPersonPhones').textContent).toEqual(
      '608-271-9000608-771-9000608-771-9000608-771-9000',
    );
    expect(getByTestId('activeStatus').textContent).toEqual('active');
    expect(queryByTestId('deceasedInfo')).toBeNull();
  });

  test('DSTU3', () => {
    const defaultProps = {
      fhirResource: exampleRelatedPersonSTU3,
    };
    const { getByTestId, queryByTestId } = render(
      <RelatedPerson {...defaultProps} />,
    );

    expect(
      getByTestId('RelatedPersonName').textContent.replace(/\s+/g, ' '),
    ).toEqual('John, X Doe (usual)');
    expect(getByTestId('RelatedPersonGender').textContent).toEqual('male');
    expect(getByTestId('RelatedPersonBirthDate').textContent).toEqual(
      '2014-06-01',
    );
    expect(getByTestId('RelatedPersonAddress').textContent).toEqual(
      ' 05 99999 ',
    );
    expect(getByTestId('RelatedPersonPhones').textContent).toEqual('-');
    expect(queryByTestId('activeStatus')).toBeNull();
    expect(queryByTestId('deceasedInfo')).toBeNull();
  });

  test('DSTU3 resource which contains communication key data', () => {
    const defaultProps = {
      fhirResource: example2RelatedPersonSTU3,
    };
    const { getByTestId } = render(<RelatedPerson {...defaultProps} />);
    expect(getByTestId('communicationLanguage').textContent).toContain('en');
  });

  test('R4', () => {
    const defaultProps = {
      fhirResource: example1RelatedPersonR4,
    };
    const { getByTestId, queryByTestId } = render(
      <RelatedPerson {...defaultProps} />,
    );

    expect(
      getByTestId('RelatedPersonName').textContent.replace(/\s+/g, ' '),
    ).toEqual('Peter, James Chalmers (official)');
    expect(getByTestId('RelatedPersonGender').textContent).toEqual('male');
    expect(getByTestId('RelatedPersonBirthDate').textContent).toEqual(
      '1974-12-25',
    );
    expect(getByTestId('RelatedPersonAddress').textContent).toContain(
      'PleasantVille, Vic 3999',
    );
    expect(getByTestId('RelatedPersonPhones').textContent).toContain(
      '(03) 5555 6473',
    );
    expect(getByTestId('activeStatus').textContent).toEqual('active');
    expect(queryByTestId('deceasedInfo')).toBeNull();
  });

  test('R4 resource which contains deceased date', () => {
    const defaultProps = {
      fhirResource: example3RelatedPersonR4,
    };
    const { getByTestId } = render(<RelatedPerson {...defaultProps} />);
    expect(getByTestId('deceasedInfo').textContent).toEqual('2/14/2015');
  });
});
