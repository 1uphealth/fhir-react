import React from 'react';
import { isUrl } from '../../../utils/isUrl';
import fhirIcons from '../../../fixtures/example-icons';

const PlaceholderImage = () => {
  return (
    <div
      className="header-icon__placeholder rounded-1"
      data-testid="placeholder"
    />
  );
};

const defaultIconOrPlaceholder = (headerIcon, resourceName) =>
  fhirIcons[resourceName] && headerIcon !== false ? (
    fhirIcons[resourceName]
  ) : (
    <PlaceholderImage />
  );

const HeaderIcon = ({ headerIcon, resourceName }) => {
  if (!headerIcon) {
    return defaultIconOrPlaceholder(headerIcon, resourceName);
  }
  if (headerIcon[resourceName]) {
    return headerIcon[resourceName];
  }
  if (React.isValidElement(headerIcon) && typeof headerIcon.type === 'string') {
    return headerIcon;
  }
  if (isUrl(headerIcon) || headerIcon.search('static/media') !== -1) {
    return (
      <img className="header-icon__image" src={headerIcon} alt="header icon" />
    );
  }
  return defaultIconOrPlaceholder(headerIcon, resourceName);
};

export default HeaderIcon;
