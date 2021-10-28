import React from 'react';
import { isUrl } from '../../../utils/isUrl';

const HeaderIcon = ({ headerIcon }) => {
  const PlaceholderImage = () => {
    return <div className="header-icon__placeholder rounded-1" />;
  };

  const Image = () => {
    if (
      React.isValidElement(headerIcon) &&
      typeof headerIcon.type === 'string'
    ) {
      return headerIcon;
    }
    if (isUrl(headerIcon)) {
      return <img src={headerIcon} alt="header icon" />;
    }
    return <PlaceholderImage />;
  };

  return (
    <div>
      <Image />
    </div>
  );
};

export default HeaderIcon;
