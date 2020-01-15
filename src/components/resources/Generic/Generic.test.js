import React from 'react';
import { render } from '@testing-library/react';
import Generic from './Generic';

it('should render component correctly', () => {
  const exampleResource = {
    resourceType: 'UnknownResource',
    id: '12345',
    code: {
      text: 'Resource code text',
    },
  };
  const { container, getByTestId } = render(
    <Generic fhirResource={exampleResource} />,
  );

  expect(getByTestId('title').textContent).toEqual('UnknownResource/12345');
  expect(container.textContent).toContain('Resource code text');
});
