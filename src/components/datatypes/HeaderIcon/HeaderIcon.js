// 1. Pass optional prop with image map to FhirResource
// 2. In resource component determine which icon (or placeholder) to pass to HeaderIcon
// 3. In HeaderIcon conditionally choose the behavior for ulr/path, node or base64
import React from 'react';

const HeaderIcon = ({ headerIcon }) => {
  const isUrl = () => {
    let url;

    try {
      url = new URL(headerIcon);
    } catch (err) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  };

  const Image = () => {
    if (!headerIcon) {
      return <div className="header-icon__placeholder rounded-1" />;
    }
    if (isUrl()) {
      return <img src={headerIcon} alt="header icon" />;
    }
    if (!isUrl()) {
      return <img src={require(`${headerIcon}`)} alt="header icon" />;
    }
    return <div className="header-icon__placeholder rounded-1" />;
  };

  return (
    <div>
      <Image />
    </div>
  );
};

export default HeaderIcon;
