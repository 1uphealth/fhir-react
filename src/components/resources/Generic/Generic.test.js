import React from 'react';
import { render } from '@testing-library/react';
import Generic from './Generic';
import fhirIcons from '../../../fixtures/example-icons';

it('should render component correctly', () => {
  const exampleResource = {
    resourceType: 'UnknownResource',
    id: '12345',
    code: {
      text: 'Resource code text',
    },
  };
  const { container, getByTestId, getByAltText } = render(
    <Generic fhirResource={exampleResource} fhirIcons={fhirIcons} />,
  );
  const headerIcon = getByAltText('generic');

  expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  expect(getByTestId('title').textContent).toEqual('UnknownResource/12345');
  expect(container.textContent).toContain('Resource code text');
});
