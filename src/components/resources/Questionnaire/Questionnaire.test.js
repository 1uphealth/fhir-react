import React from 'react';
import { render } from '@testing-library/react';

import Questionnaire from './Questionnaire';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/questionnaire/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/questionnaire/example2.json';

import stu3Example1 from '../../../fixtures/stu3/resources/questionnaire/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/questionnaire/example2.json';

import r4Example1 from '../../../fixtures/r4/resources/questionnaire/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/questionnaire/example2.json';

import fhirIcons from '../../../fixtures/example-icons';

describe('Questionnaire should render component correctly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
    };

    const { getByAltText } = render(<Questionnaire {...defaultProps} />);
    const headerIcon = getByAltText('questionnaire');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: false,
    };

    const { getByTestId } = render(<Questionnaire {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: (
        <img
          src={require('../assets/containers/Questionnaire/questionnaire.svg')}
          alt="clipboard and pen"
        />
      ),
    };

    const { getByAltText } = render(<Questionnaire {...defaultProps} />);
    const headerIcon = getByAltText('clipboard and pen');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<Questionnaire {...defaultProps} />);
    const headerIcon = getByAltText('clipboard and pen');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<Questionnaire {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('should render component correctly with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId } = render(<Questionnaire {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toContain(
      'Lifelines Questionnaire 1 ',
    );
    expect(getByTestId('status').textContent).toEqual('published');
    expect(getByTestId('dateTime').textContent).toEqual('2010');

    // contain subgroup description
    expect(String(getByTestId('linkId-2').textContent).trim()).toContain(
      'General questions',
    );

    // contain id and test of questions of subgroup
    expect(String(getByTestId('linkId-2.1').textContent).trim()).toEqual(
      'What is your gender?',
    );
    expect(String(getByTestId('linkId-2.2').textContent).trim()).toEqual(
      'What is your date of birth?',
    );
    expect(String(getByTestId('linkId-2.3').textContent).trim()).toEqual(
      'What is your country of birth?',
    );
    expect(String(getByTestId('linkId-2.4').textContent).trim()).toEqual(
      'What is your marital status?',
    );
  });

  it('should render component correctly with DSTU2 source data with nested group of questions', () => {
    const defaultProps = {
      fhirResource: dstu2Example2,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId } = render(<Questionnaire {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toContain(
      'Cancer Quality Forum Questionnaire',
    );
    expect(getByTestId('status').textContent).toEqual('draft');
    expect(getByTestId('dateTime').textContent).toEqual('January 2012');

    // contain id and test of questions of subgroup
    expect(String(getByTestId('linkId-1.1').textContent).trim()).toContain(
      '(COMORBIDITY)',
    );
    expect(String(getByTestId('linkId-1.1.1').textContent).trim()).toContain(
      '(COMORB)',
    );
    expect(String(getByTestId('linkId-1.1.1.1').textContent).trim()).toContain(
      '(CARDIAL)',
    );
    expect(
      String(getByTestId('linkId-1.1.1.1.1').textContent).trim(),
    ).toContain('(COMORBCAR)');
  });

  it('should render component correctly with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<Questionnaire {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toContain(
      'Lifelines Questionnaire ',
    );
    expect(getByTestId('status').textContent).toEqual('active');
    expect(getByTestId('dateTime').textContent).toEqual('2010');

    // contain subgroup description
    expect(String(getByTestId('linkId-2').textContent).trim()).toContain(
      'General questions',
    );

    // contain id and test of questions of subgroup
    expect(String(getByTestId('linkId-2.1').textContent).trim()).toContain(
      'What is your gender?',
    );
    expect(String(getByTestId('linkId-2.2').textContent).trim()).toEqual(
      'What is your date of birth?',
    );
    expect(String(getByTestId('linkId-2.3').textContent).trim()).toEqual(
      'What is your country of birth?',
    );
    expect(String(getByTestId('linkId-2.4').textContent).trim()).toEqual(
      'What is your marital status?',
    );
  });

  it('should render component correctly with STU3 source data with nested group of questions', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<Questionnaire {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toContain(
      'Cancer Quality Forum Questionnaire',
    );
    expect(getByTestId('status').textContent).toEqual('draft');
    expect(getByTestId('dateTime').textContent).toEqual('January 2012');

    // contain id and test of questions of subgroup
    expect(String(getByTestId('linkId-1.1').textContent).trim()).toContain(
      '(COMORB)',
    );
    expect(String(getByTestId('linkId-1.1.1').textContent).trim()).toContain(
      '(CARDIAL)',
    );
    expect(String(getByTestId('linkId-1.1.1.1').textContent).trim()).toContain(
      '(COMORBCAR)',
    );
    expect(
      String(getByTestId('linkId-1.1.1.1.1').textContent).trim(),
    ).toContain('Angina Pectoris');
  });

  it('should render component correctly with R4 source data', () => {
    const defaultProps = {
      fhirResource: r4Example2,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId } = render(<Questionnaire {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toContain(
      'Lifelines Questionnaire ',
    );
    expect(getByTestId('status').textContent).toEqual('active');
    expect(getByTestId('dateTime').textContent).toEqual('2010');

    // contain subgroup description
    expect(String(getByTestId('linkId-2').textContent).trim()).toContain(
      'General questions',
    );

    // contain id and test of questions of subgroup
    expect(String(getByTestId('linkId-2.1').textContent).trim()).toContain(
      'What is your gender?',
    );
    expect(String(getByTestId('linkId-2.2').textContent).trim()).toEqual(
      'What is your date of birth?',
    );
    expect(String(getByTestId('linkId-2.3').textContent).trim()).toEqual(
      'What is your country of birth?',
    );
    expect(String(getByTestId('linkId-2.4').textContent).trim()).toEqual(
      'What is your marital status?',
    );
  });

  it('should render component correctly with R4 source data with nested group of questions', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId } = render(<Questionnaire {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toContain(
      'Cancer Quality Forum Questionnaire',
    );
    expect(getByTestId('status').textContent).toEqual('draft');
    expect(getByTestId('dateTime').textContent).toEqual('January 2012');

    // contain id and test of questions of subgroup
    expect(String(getByTestId('linkId-1.1').textContent).trim()).toContain(
      '(COMORB)',
    );
    expect(String(getByTestId('linkId-1.1.1').textContent).trim()).toContain(
      '(CARDIAL)',
    );
    expect(String(getByTestId('linkId-1.1.1.1').textContent).trim()).toContain(
      '(COMORBCAR)',
    );
    expect(
      String(getByTestId('linkId-1.1.1.1.1').textContent).trim(),
    ).toContain('Angina Pectoris');
  });
});
