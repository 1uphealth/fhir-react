import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import ResearchStudy from './ResearchStudy';
import fhirVersions from '../fhirResourceVersions';
import stu3Example1 from '../../../fixtures/stu3/resources/researchStudy/example-1.json';
import r4Example1 from '../../../fixtures/r4/resources/researchStudy/example1.json';

import { nbspRegex } from '../../../testUtils';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render ResearchStudy component properly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
    };

    const { getByAltText } = render(<ResearchStudy {...defaultProps} />);
    const headerIcon = getByAltText('research study');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
      fhirIcons: false,
    };

    const { getByTestId } = render(<ResearchStudy {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
      fhirIcons: (
        <img
          src={require('../assets/containers/ResearchStudy/research-study.svg')}
          alt="finger pointing something in a book"
        />
      ),
    };

    const { getByAltText } = render(<ResearchStudy {...defaultProps} />);
    const headerIcon = getByAltText('finger pointing something in a book');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<ResearchStudy {...defaultProps} />);
    const headerIcon = getByAltText('finger pointing something in a book');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<ResearchStudy {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };

    const { getByTestId, getAllByTestId } = render(
      <ResearchStudy {...defaultProps} />,
    );

    const title = getByTestId('title').textContent;
    const status = getByTestId('status').textContent;
    const period = getByTestId('period').textContent;
    const category = getByTestId('category').textContent.replace(
      nbspRegex,
      ' ',
    );
    const focus = getByTestId('focus').textContent.replace(nbspRegex, ' ');
    const protocol = getByTestId('protocol').textContent;
    const partOf = getByTestId('partOf').textContent;
    const contactNames = getAllByTestId('contactsName').map(n => n.textContent);
    const contactTelecoms = getAllByTestId('contactsTelecom').map(
      n => n.textContent,
    );
    const keywords = getByTestId('keywords').textContent;
    const enrollments = getAllByTestId('enrollmentReference').map(
      n => n.textContent,
    );
    const sponsor = getByTestId('sponsor').textContent;
    const principalInvestigator = getByTestId('principalInvestigator')
      .textContent;
    const sites = getAllByTestId('siteReference').map(n => n.textContent);
    const armNames = getAllByTestId('arms.name').map(n => n.textContent);
    const armDescriptions = getAllByTestId('arms.description').map(
      n => n.textContent,
    );

    expect(title).toEqual('Example study');
    expect(status).toEqual('completed');
    expect(period).toEqual('02/01/2015 - 02/21/2015');
    expect(category).toEqual('Gene expression (GENE)');
    expect(focus).toEqual('Prostate cancer (PRC)');
    expect(protocol).toEqual('PlanDefinition/pdf1');
    expect(partOf).toEqual('ResearchStudy/rsd1');
    expect(contactNames).toEqual(['Professor Brand']);
    expect(contactTelecoms).toEqual(['phone+31715269702']);
    expect(keywords).toContain('Prostate cancer');
    expect(keywords).toContain('Gene expression research');
    expect(enrollments).toEqual(['Group/enr1', 'Group/enr2']);
    expect(sponsor).toEqual('Organization/spn1');
    expect(principalInvestigator).toEqual('Practitioner/pnv1');
    expect(sites).toEqual(['Location/st1', 'Location/st2']);
    expect(armNames).toEqual(['Study arm 1', 'Study arm 2']);
    expect(armDescriptions).toEqual([
      'Study arm 1 description',
      'Study arm 2 description',
    ]);
  });

  it('with R4 source data', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };

    const { getByTestId } = render(<ResearchStudy {...defaultProps} />);

    const title = getByTestId('title').textContent;
    expect(title).toEqual('Research Study');

    const status = getByTestId('status').textContent;
    expect(status).toEqual('completed');
  });

  it('should fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };

    const onClick = jest.fn();
    const { getByRole } = render(
      <ResearchStudy {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).not.toEqual('collapse');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };

    const onClick = 'test';
    const { getByRole } = render(
      <ResearchStudy {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
