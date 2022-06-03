import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CarePlan from './CarePlan';
import fhirVersions from '../fhirResourceVersions';

import examplecarePlanDSTU2 from '../../../fixtures/dstu2/resources/carePlan/example1.json';
import exampleCarePlanSTU3 from '../../../fixtures/stu3/resources/carePlan/example1.json';
import example1CarePlanR4 from '../../../fixtures/r4/resources/carePlan/weightLossPlan.json';
import example2CarePlanR4 from '../../../fixtures/r4/resources/carePlan/pregnancyPlan.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render component correctly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirResource: examplecarePlanDSTU2,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { getByAltText } = render(<CarePlan {...defaultProps} />);
    const headerIcon = getByAltText('care plan');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirResource: examplecarePlanDSTU2,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: false,
    };

    const { getByTestId } = render(<CarePlan {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: examplecarePlanDSTU2,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: (
        <img
          src={require('../assets/containers/CarePlan/care-plan.svg')}
          alt="care plan"
        />
      ),
    };

    const { getByAltText } = render(<CarePlan {...defaultProps} />);
    const headerIcon = getByAltText('care plan');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: examplecarePlanDSTU2,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<CarePlan {...defaultProps} />);
    const headerIcon = getByAltText('care plan');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirResource: examplecarePlanDSTU2,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<CarePlan {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: examplecarePlanDSTU2,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { container, getByTestId } = render(<CarePlan {...defaultProps} />);

    expect(container).not.toBeNull();

    expect(getByTestId('status').textContent).toContain('active');
    expect(getByTestId('category').textContent).toContain('Longitudinal');
    expect(getByTestId('addresses').textContent).toContain('Dog bite');
    expect(getByTestId('activity').textContent).toContain('Adult diet');
    expect(getByTestId('subject').textContent).toEqual('Patient/d47f763e7c7f');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: exampleCarePlanSTU3,
      fhirVersion: fhirVersions.STU3,
    };
    const { container, getByTestId } = render(<CarePlan {...defaultProps} />);

    expect(container).not.toBeNull();

    expect(getByTestId('status').textContent).toContain('active');
    expect(getByTestId('addresses').textContent).toContain('obesity');
    expect(getByTestId('activity').textContent).toContain('3141-9');
    expect(getByTestId('intent').textContent).toEqual('plan');
    expect(getByTestId('description').textContent).toContain('Manage obesity');
    expect(getByTestId('subject').textContent).toContain(
      'Peter James Chalmers',
    );
    expect(getByTestId('author').textContent).toContain('Dr Adam Careful');
    expect(getByTestId('periodEnd').textContent).toEqual('06/01/2017');
    expect(getByTestId('basedOn').textContent).toEqual(
      'Management of Type 2 Diabetes',
    );
    expect(getByTestId('partOf').textContent).toEqual('Overall wellness plan');
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: example1CarePlanR4,
      fhirVersion: fhirVersions.R4,
    };
    const { container, getByTestId } = render(<CarePlan {...defaultProps} />);

    expect(container).not.toBeNull();

    expect(getByTestId('status').textContent).toContain('active');
    expect(getByTestId('addresses').textContent).toContain('obesity');
    expect(getByTestId('activity').textContent).toContain('3141-9');
    expect(getByTestId('intent').textContent).toEqual('plan');
    expect(getByTestId('goals').textContent).toEqual('Goal/example');
    expect(getByTestId('description').textContent).toContain('Manage obesity');
    expect(getByTestId('subject').textContent).toContain(
      'Peter James Chalmers',
    );
    expect(getByTestId('author').textContent).toContain('Dr Adam Careful');
    expect(getByTestId('periodEnd').textContent).toEqual('06/01/2017');
    expect(getByTestId('basedOn').textContent).toEqual(
      'Management of Type 2 Diabetes',
    );
    expect(getByTestId('partOf').textContent).toEqual('Overall wellness plan');
  });

  it('should render with R4 example2 data', () => {
    const defaultProps = {
      fhirResource: example2CarePlanR4,
      fhirVersion: fhirVersions.R4,
    };
    const { container, getByTestId } = render(<CarePlan {...defaultProps} />);

    expect(container).not.toBeNull();

    expect(getByTestId('addresses').textContent).toContain('pregnancy');
    expect(getByTestId('activity').textContent).toContain('First antenatal');
    expect(getByTestId('intent').textContent).toEqual('plan');
    expect(getByTestId('goals').textContent).toEqual('#goal');
    expect(getByTestId('subject').textContent).toContain('Eve Everywoman');
    expect(getByTestId('periodStart').textContent).toEqual('01/01/2013');
    expect(getByTestId('periodEnd').textContent).toEqual('10/01/2013');
  });

  it('should fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: example2CarePlanR4,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = jest.fn();
    const { getByRole } = render(
      <CarePlan {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).not.toEqual('collapse');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: example2CarePlanR4,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = 'test';
    const { getByRole } = render(
      <CarePlan {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
