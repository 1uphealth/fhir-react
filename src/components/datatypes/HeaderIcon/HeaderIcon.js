import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { convertCamelCaseToSentence } from '../../../utils/convertCamelCaseToSentence';

const PlaceholderImage = () => {
  return (
    <div
      className="header-icon__placeholder rounded-1"
      data-testid="placeholder"
    />
  );
};

const defaultIconOrPlaceholder = (headerIcon, resourceName) => {
  let imageSrc;
  const svgFileName =
    resourceName && convertCamelCaseToSentence(resourceName).replace(/ /g, '-');
  try {
    imageSrc = require(`../../../assets/containers/${resourceName}/${svgFileName}.svg`);
  } catch (err) {
    imageSrc = null;
  }
  return imageSrc && headerIcon !== false ? (
    <img
      className="header-icon__image"
      src={imageSrc}
      alt={convertCamelCaseToSentence(resourceName)}
    />
  ) : (
    <PlaceholderImage />
  );
};

const useImageError = () => {
  const [error, setError] = useState(false);
  const ref = useRef();

  const onError = () => {
    setError(true);
  };

  useEffect(() => {
    if (ref.current && ref.current.error) {
      onError();
    }
  });

  return [ref, error, onError];
};

const HeaderIcon = ({ headerIcon, resourceName }) => {
  const [ref, error, onError] = useImageError();
  if (!headerIcon) {
    return defaultIconOrPlaceholder(headerIcon, resourceName);
  }
  if (headerIcon[resourceName]) {
    return headerIcon[resourceName];
  }
  if (React.isValidElement(headerIcon) && typeof headerIcon.type === 'string') {
    return headerIcon;
  }

  return !error ? (
    <img
      ref={ref}
      onError={onError}
      className="header-icon__image"
      src={headerIcon}
      alt="header icon"
    />
  ) : (
    defaultIconOrPlaceholder(headerIcon, resourceName)
  );
};

export default HeaderIcon;
