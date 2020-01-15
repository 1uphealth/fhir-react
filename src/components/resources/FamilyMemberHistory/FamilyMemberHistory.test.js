import React from 'react';
import { render } from '@testing-library/react';
import FamilyMemberHistory from './FamilyMemberHistory';

import example1DSTU2 from '../../../fixtures/dstu2/resources/familyMemberHistory/example1.json';

describe('should render FamilyMemberHistory component correctly', () => {
  it('DSTU2', () => {
    const defaultProps = {
      fhirResource: example1DSTU2,
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
