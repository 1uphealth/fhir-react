import React from 'react';
import { render } from '@testing-library/react';
import FamilyMemberHistory from './FamilyMemberHistory';
import fhirTypes from '../fhirResourceTypes';

import example1DSTU2 from '../../../fixtures/dstu2/resources/familyMemberHistory/example1.json';
import example1STU3 from '../../../fixtures/stu3/resources/familyMemberHistory/example1.json';

describe('should render FamilyMemberHistory component correctly', () => {
  it('DSTU2', () => {
    const defaultProps = {
      fhirResource: example1DSTU2,
      fhirVersion: fhirTypes.DSTU2,
    };
    const { container, getByTestId } = render(
      <FamilyMemberHistory {...defaultProps} />,
    );

    expect(container).not.toBeNull();
    expect(getByTestId('title').textContent).toEqual('Heart Attack');
    expect(getByTestId('patient').textContent).toContain('Peter Patient');
    expect(getByTestId('hasRelationship').textContent).toContain('father');
    expect(getByTestId('noteText').textContent).toContain('Was fishing at');
  });

  it('STU3', () => {
    const defaultProps = {
      fhirResource: example1STU3,
      fhirVersion: fhirTypes.STU3,
    };
    const { container, getByTestId } = render(
      <FamilyMemberHistory {...defaultProps} />,
    );

    expect(container).not.toBeNull();
    expect(getByTestId('title').textContent).toEqual('Heart Attack');
    expect(getByTestId('patient').textContent).toContain('Peter Patient');
    expect(getByTestId('hasRelationship').textContent).toContain('father');
    expect(getByTestId('noteText').textContent).toContain('Was fishing at');
  });
});
