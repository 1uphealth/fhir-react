import { Header, Root } from '../../ui';
import React from 'react';
import PropTypes from 'prop-types';

const ResourceCategory = ({ title, itemsCount, fhirIcons }) => {
  const parseNumber = value =>
    /^[1-9]+\d*$/.test(value) ? Number.parseInt(value) : null;

  const getItemsCountLabel = () =>
    `${parsedItemsCount} ${parsedItemsCount === 1 ? 'item' : 'items'}`;

  const parsedItemsCount = parseNumber(itemsCount);

  return (
    <Root name="ResourceCategory">
      <button
        type="button"
        className="btn d-flex align-items-center justify-content-between w-100 py-4 px-4 bg-white"
      >
        <div className="d-flex gap-2">
          <Header
            resourceName={'ResourceCategory'}
            title={title}
            icon={fhirIcons}
          />
        </div>
        <div className="d-flex gap-2 align-items-center">
          {parsedItemsCount > 0 && (
            <div
              className="d-flex rounded-pill py-1 px-2 bg-gray-200"
              data-testid="itemsCount"
            >
              <small className="fw-bold text-nowrap ">
                {getItemsCountLabel()}
              </small>
            </div>
          )}
          <img
            src={require('../../../assets/common/chevron-right.svg')}
            alt="chevron"
            style={{ height: 28, width: 28 }}
          />
        </div>
      </button>
    </Root>
  );
};

ResourceCategory.propTypes = {
  title: PropTypes.string.isRequired,
  itemsCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ResourceCategory;
