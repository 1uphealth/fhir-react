import React from 'react';
import { render } from '@testing-library/react';

import fhirIcons from '../../../fixtures/example-icons';
import ResourceCategory from './ResourceCategory';

describe('should render ResourceCategory component properly', () => {
  const placeholderResource = fhirIcons['ResourceCategoryPlaceholder'].props;

  it('should render ResourceCategory component with icon and itemsCount > 1 correctly', () => {
    const defaultProps = {
      fhirIcons: fhirIcons,
      itemsCount: 41,
      title: 'Resource name',
    };

    const { container, getByTestId, getByAltText } = render(
      <ResourceCategory {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('itemsCount').textContent).toContain('41 items');
    expect(getByTestId('title').textContent).toContain('Resource name');
    const image = getByAltText(placeholderResource.alt);
    expect(image.src).toContain(placeholderResource.src);
  });

  it('should render ResourceCategory component with icon and itemsCount === 1 correctly', () => {
    const defaultProps = {
      fhirIcons: fhirIcons,
      itemsCount: 1,
      title: 'Resource name',
    };

    const { container, getByTestId, getByAltText } = render(
      <ResourceCategory {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('itemsCount').textContent).toContain('1 item');
    expect(getByTestId('title').textContent).toContain('Resource name');
    const image = getByAltText(placeholderResource.alt);
    expect(image.src).toContain(placeholderResource.src);
  });
});
