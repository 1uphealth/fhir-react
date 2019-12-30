import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import Coding from '../../datatypes/Coding';

const CarePlanAddresses = props => {
  const { fhirData } = props;
  const hasCategories = _get(fhirData, 'detail.category.coding');
  return (
    <div className="mb-2">
      <h6 className="mb-0">
        <strong>
          {_get(fhirData, 'detail.code.text') ||
            _get(fhirData, 'detail.code.coding[0].code')}
        </strong>
      </h6>
      {hasCategories &&
        _get(fhirData, 'detail.category.coding', []).map((coding, i) => (
          <Coding key={`item-${i}`} fhirData={coding} />
        ))}
      }
    </div>
  );
};

CarePlanAddresses.propTypes = {
  fhirData: PropTypes.shape({}).isRequired,
};

export default CarePlanAddresses;
