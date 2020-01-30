import React from 'react';
import { render } from '@testing-library/react';

import ResearchStudy from './ResearchStudy';
import fhirVersions from '../fhirResourceVersions';
import stu3Example1 from '../../../fixtures/stu3/resources/researchStudy/example-1.json';
import { nbspRegex } from '../../../testUtils';

describe('should render ResearchStudy component properly', () => {
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
    expect(period).toEqual('2015-02-01 - 2015-02-21');
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
});
