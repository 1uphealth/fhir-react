import React from 'react';
import { render } from '@testing-library/react';

import fhirIcons from '../../../fixtures/example-icons';
import ResourceCategory from './ResourceCategory';

describe('should render ResourceCategory component properly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      itemsCount: '41',
      title: 'Resource name',
    };

    const { getByAltText } = render(<ResourceCategory {...defaultProps} />);
    const headerIcon = getByAltText('resource category');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      itemsCount: '41',
      title: 'Resource name',
      fhirIcons: false,
    };

    const { getByTestId } = render(<ResourceCategory {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      itemsCount: '41',
      title: 'Resource name',
      fhirIcons: (
        <img
          src={require('../assets/containers/ResourceCategory/resource-category.svg')}
          alt="resource category"
        />
      ),
    };

    const { getByAltText } = render(<ResourceCategory {...defaultProps} />);
    const headerIcon = getByAltText('resource category');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      itemsCount: '41',
      title: 'Resource name',
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<ResourceCategory {...defaultProps} />);
    const headerIcon = getByAltText('resource category');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      itemsCount: '41',
      title: 'Resource name',
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<ResourceCategory {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('should render ResourceCategory component with itemsCount > 1 correctly', () => {
    const defaultProps = {
      fhirIcons: fhirIcons,
      itemsCount: '41',
      title: 'Resource name',
    };

    const { container, getByTestId } = render(
      <ResourceCategory {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('itemsCount').textContent).toContain('41 items');
    expect(getByTestId('title').textContent).toContain('Resource name');
  });

  it('should render ResourceCategory component with itemsCount === 1 correctly', () => {
    const defaultProps = {
      fhirIcons: fhirIcons,
      itemsCount: 1,
      title: 'Resource name',
    };

    const { container, getByTestId } = render(
      <ResourceCategory {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('itemsCount').textContent).toContain('1 item');
    expect(getByTestId('title').textContent).toContain('Resource name');
  });

  it('should render ResourceCategory correctly with negative number passed as itemsCount', () => {
    const defaultProps = {
      fhirIcons: fhirIcons,
      itemsCount: -1,
      title: 'Resource name',
    };

    const { container, getByTestId, queryByTestId } = render(
      <ResourceCategory {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    const item = queryByTestId('itemsCount');
    expect(item).toBeNull();
    expect(getByTestId('title').textContent).toContain('Resource name');
  });

  it('should render ResourceCategory correctly with invalid string passed as itemsCount', () => {
    const defaultProps = {
      fhirIcons: fhirIcons,
      itemsCount: 'asdf1',
      title: 'Resource name',
    };

    const { container, getByTestId, queryByTestId } = render(
      <ResourceCategory {...defaultProps} />,
    );
    expect(container).not.toBeNull();
    const item = queryByTestId('itemsCount');
    expect(item).toBeNull();
    expect(getByTestId('title').textContent).toContain('Resource name');
  });

  it('should render ResourceCategory correctly with floating point number passed as text in itemsCount', () => {
    const defaultProps = {
      fhirIcons: fhirIcons,
      itemsCount: '0.5',
      title: 'Resource name',
    };

    const { container, getByTestId, queryByTestId } = render(
      <ResourceCategory {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    const item = queryByTestId('itemsCount');
    expect(item).toBeNull();
    expect(getByTestId('title').textContent).toContain('Resource name');
  });
});
