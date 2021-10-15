// 1. Pass optional prop with image map to FhirResource
// 2. In resource component determine which icon (or placeholder) to pass to HeaderIcon
// 3. In HeaderIcon conditionally choose the behavior for ulr/path, node or base64
import React from 'react';

const HeaderIcon = ({ headerIcon }) => {
  return (
    <div>
      {headerIcon ? (
        <img src={headerIcon} alt="header icon" />
      ) : (
        <div className="header-icon__placeholder rounded-1" />
      )}
    </div>
  );
};

export default HeaderIcon;
