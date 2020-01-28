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
  });
});
