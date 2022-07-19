import Condition from './Condition';
import React from 'react';
import example1ConditionSeverityR4 from '../../../fixtures/r4/resources/condition/example1.json';
import example2ConditionSeverityR4 from '../../../fixtures/r4/resources/condition/example2.json';
import example3ConditionSeverityR4 from '../../../fixtures/r4/resources/condition/example3.json';
import exampleCondition from '../../../fixtures/dstu2/resources/condition/example.json';
import exampleConditionSTU3 from '../../../fixtures/stu3/resources/condition/example.json';
import exampleConditionSeverity from '../../../fixtures/dstu2/resources/condition/example-severity.json';
import exampleConditionSeveritySTU3 from '../../../fixtures/stu3/resources/condition/example-severity.json';
import fhirVersions from '../fhirResourceVersions';
import { fireEvent, render } from '@testing-library/react';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render component correctly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: exampleCondition,
    };

    const { getByAltText } = render(<Condition {...defaultProps} />);
    const headerIcon = getByAltText('condition');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: exampleCondition,
      fhirIcons: false,
    };

    const { getByTestId } = render(<Condition {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: exampleCondition,
      fhirIcons: (
        <img
          src={require('../assets/containers/Condition/condition.svg')}
          alt="condition"
        />
      ),
    };

    const { getByAltText } = render(<Condition {...defaultProps} />);
    const headerIcon = getByAltText('condition');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: exampleCondition,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<Condition {...defaultProps} />);
    const headerIcon = getByAltText('condition');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: exampleCondition,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<Condition {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('DSTU2 - without severity field', () => {
    const defaultProps = {
      fhirResource: exampleCondition,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: fhirIcons,
    };
    const { getByTestId, queryAllByTestId } = render(
      <Condition {...defaultProps} />,
    );

    expect(getByTestId('clinicalStatus').textContent).toEqual('active');
    expect(queryAllByTestId('severity').length).toEqual(0);
  });

  test('DSTU2 - with severity field', () => {
    const defaultProps = {
      fhirResource: exampleConditionSeverity,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: fhirIcons,
    };
    const { getByTestId } = render(<Condition {...defaultProps} />);

    expect(getByTestId('clinicalStatus').textContent).toEqual('active');
    expect(getByTestId('severity').textContent).toEqual('Medium severity');
    expect(getByTestId('onsetDate').textContent).toEqual('12/02/2019');
    expect(getByTestId('asserter').textContent).toEqual('MOORE, NICK');
  });

  it('STU3 - without severity field', () => {
    const defaultProps = {
      fhirResource: exampleConditionSTU3,
      fhirVersion: fhirVersions.STU3,
      fhirIcons: fhirIcons,
    };
    const { getByTestId, queryAllByTestId } = render(
      <Condition {...defaultProps} />,
    );

    expect(getByTestId('clinicalStatus').textContent).toEqual('active');
    expect(queryAllByTestId('severity').length).toEqual(0);
  });

  it('STU3 - with severity field', () => {
    const defaultProps = {
      fhirResource: exampleConditionSeveritySTU3,
      fhirVersion: fhirVersions.STU3,
      fhirIcons: fhirIcons,
    };
    const { getByTestId } = render(<Condition {...defaultProps} />);

    expect(getByTestId('clinicalStatus').textContent).toEqual('active');
    expect(getByTestId('severity').textContent).toEqual(
      'Moderate to severe severity',
    );
    expect(getByTestId('onsetDate').textContent).toEqual('03/08/2013');
    expect(getByTestId('asserter').textContent).toEqual('Practitioner/f201');
  });

  it('R4 - using example1 fixture', () => {
    const defaultProps = {
      fhirResource: example1ConditionSeverityR4,
      fhirVersion: fhirVersions.R4,
      fhirIcons: fhirIcons,
    };
    const { getByTestId, queryAllByTestId } = render(
      <Condition {...defaultProps} />,
    );

    expect(getByTestId('clinicalStatus').textContent).toEqual('active');
    expect(getByTestId('severity').textContent).toEqual('Severe severity');
    expect(getByTestId('onsetDate').textContent).toEqual('05/24/2012');
    expect(queryAllByTestId('asserter').length).toEqual(0);
    expect(queryAllByTestId('dateRecorded').length).toEqual(0);
  });

  it('R4 - using example2 fixture', () => {
    const defaultProps = {
      fhirResource: example2ConditionSeverityR4,
      fhirVersion: fhirVersions.R4,
      fhirIcons: fhirIcons,
    };
    const { getByTestId, queryAllByTestId } = render(
      <Condition {...defaultProps} />,
    );

    expect(getByTestId('clinicalStatus').textContent).toEqual('active');
    expect(getByTestId('severity').textContent).toEqual('Mild severity');
    expect(queryAllByTestId('onsetDate').length).toEqual(0);
    expect(queryAllByTestId('asserter').length).toEqual(0);
    expect(queryAllByTestId('dateRecorded').length).toEqual(0);
  });

  it('R4 - using example3 fixture', () => {
    const defaultProps = {
      fhirResource: example3ConditionSeverityR4,
      fhirVersion: fhirVersions.R4,
      fhirIcons: fhirIcons,
    };
    const { getByTestId } = render(<Condition {...defaultProps} />);

    expect(getByTestId('clinicalStatus').textContent).toEqual('resolved');
    expect(getByTestId('severity').textContent).toEqual('Mild severity');
    expect(getByTestId('onsetDate').textContent).toEqual('04/02/2013');
    expect(getByTestId('asserter').textContent).toEqual('Practitioner/f201');
    expect(getByTestId('dateRecorded').textContent).toEqual('04/04/2013');
  });

  it('should fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: example3ConditionSeverityR4,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = jest.fn();
    const { getByRole } = render(
      <Condition {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).not.toEqual('collapse');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: example3ConditionSeverityR4,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = 'test';
    const { getByRole } = render(
      <Condition {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
