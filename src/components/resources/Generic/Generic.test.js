import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Generic from './Generic';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render the Generic component properly', () => {
  const exampleResource = {
    resourceType: 'UnknownResource',
    id: '12345',
    code: {
      text: 'Resource code text',
    },
  };

  it('should render component correctly', () => {
    const { container, getByTestId, getByAltText } = render(
      <Generic fhirResource={exampleResource} fhirIcons={fhirIcons} />,
    );
    const headerIcon = getByAltText('generic');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
    expect(getByTestId('title').textContent).toEqual('UnknownResource/12345');
    expect(container.textContent).toContain('Resource code text');
  });

  it('should fire custom onClick function', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Generic fhirResource={exampleResource} onClick={onClick} />,
    );
    const accordion = getByRole('button');

    fireEvent.click(accordion);

    expect(onClick).toHaveBeenCalled();
  });
});
