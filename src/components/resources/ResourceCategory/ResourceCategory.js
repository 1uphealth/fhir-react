import { Root, Title } from '../../ui';
import ChevronRight from '../../../assets/common/chevron-right.svg';
import HeaderIcon from '../../datatypes/HeaderIcon';
import React from 'react';
import PropTypes from 'prop-types';

const ResourceCategory = props => {
  const { title, itemsCount, fhirIcons } = props;

  const parseNumber = value =>
    /^[1-9]+\d*$/.test(value) ? Number.parseInt(value) : null;

  const getItemsCountLabel = () =>
    `${parsedItemsCount} ${parsedItemsCount === 1 ? 'item' : 'items'}`;

  const headerIcon = fhirIcons['ResourceCategoryPlaceholder'];
  const parsedItemsCount = parseNumber(itemsCount);

  return (
    <Root name="ResourceCategory">
      <button
        type="button"
        className="btn d-flex align-items-center justify-content-between w-100 py-3 px-4"
      >
        <div className="d-flex gap-2">
          <HeaderIcon headerIcon={headerIcon} />
          <Title data-testid="resourceCategoryName">{title}</Title>
        </div>
        <div className="d-flex gap-3">
          {parsedItemsCount > 0 && (
            <div
              className="rounded-pill py-1 px-2 bg-primary"
              data-testid="itemsCount"
            >
              <span className="text-white fw-bold text-nowrap">
                {getItemsCountLabel()}
              </span>
            </div>
          )}
          <img src={ChevronRight} alt="chevron" />
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
