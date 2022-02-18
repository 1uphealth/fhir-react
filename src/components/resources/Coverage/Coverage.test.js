import React from 'react';
import { render } from '@testing-library/react';
import Coverage from './Coverage';
import fhirVersions from '../fhirResourceVersions';

import { nbspRegex } from '../../../testUtils';
import exampleCoverage from '../../../fixtures/dstu2/resources/coverage/example1.json';
import exampleCoverageStu3 from '../../../fixtures/stu3/resources/coverage/example1.json';
import example2CoverageStu3 from '../../../fixtures/stu3/resources/coverage/example2.json';
import exampleCoverageR4 from '../../../fixtures/r4/resources/coverage/example1.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render component correctly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: exampleCoverage,
    };

    const { getByAltText } = render(<Coverage {...defaultProps} />);
    const headerIcon = getByAltText('coverage');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: exampleCoverage,
      fhirIcons: false,
    };

    const { getByTestId } = render(<Coverage {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: exampleCoverage,
      fhirIcons: (
        <img
          src={require('../assets/containers/Coverage/coverage.svg')}
          alt="coverage"
        />
      ),
    };

    const { getByAltText } = render(<Coverage {...defaultProps} />);
    const headerIcon = getByAltText('coverage');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: exampleCoverage,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<Coverage {...defaultProps} />);
    const headerIcon = getByAltText('coverage');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: exampleCoverage,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<Coverage {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: exampleCoverage,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId } = render(<Coverage {...defaultProps} />);

    expect(getByTestId('title').textContent.replace(nbspRegex, ' ')).toContain(
      'Coverage',
    );
    expect(getByTestId('issuer').textContent).toContain('Organization/2');
    expect(getByTestId('planId').textContent).toContain('CBI35');
    expect(getByTestId('coverageFrom').textContent).toContain('2011-05-23');
    expect(getByTestId('coverageTo').textContent).toContain('2012-05-23');
    expect(getByTestId('type').textContent).toContain('extended healthcare');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: exampleCoverageStu3,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<Coverage {...defaultProps} />);

    expect(getByTestId('title').textContent.replace(nbspRegex, ' ')).toContain(
      'Coverage',
    );
    expect(getByTestId('issuer').textContent).toContain('Organization/2');
    expect(getByTestId('planId').textContent).toContain('B37FC');
    expect(getByTestId('coverageFrom').textContent).toContain('2011-05-23');
    expect(getByTestId('coverageTo').textContent).toContain('2012-05-23');
    expect(getByTestId('type').textContent).toContain('extended healthcare');
    expect(getByTestId('details').textContent).toContain('Full Coverage');
  });

  it('should render with STU3 source data which contains the extensions key', () => {
    const defaultProps = {
      fhirResource: example2CoverageStu3,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<Coverage {...defaultProps} />);

    expect(getByTestId('extensions').textContent).toContain(
      'without end-stage renal disease',
    );
    expect(getByTestId('extensions').textContent).toContain(
      'beneficiary does not have',
    );
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: exampleCoverageR4,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId, queryAllByTestId } = render(
      <Coverage {...defaultProps} />,
    );

    expect(getByTestId('title').textContent.replace(nbspRegex, ' ')).toContain(
      'Coverage',
    );
    expect(getByTestId('issuer').textContent).toContain('Organization/2');
    expect(queryAllByTestId('planId').length).toEqual(0);
    expect(getByTestId('coverageFrom').textContent).toContain('2011-05-23');
    expect(getByTestId('coverageTo').textContent).toContain('2012-05-23');
    expect(getByTestId('type').textContent).toContain('extended healthcare');
    expect(queryAllByTestId('details').length).toEqual(0);
  });
});
