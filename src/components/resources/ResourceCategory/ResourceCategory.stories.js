import React from 'react';
import ResourceCategory from './ResourceCategory';
import fhirIcons from '../../../fixtures/example-icons';
import ResourceCategoryIcon from '../../../assets/containers/ResourceCategory/resource-category.svg';

export default { title: 'ResourceCategory' };

export const ExampleWithAllProperties = () => {
  return (
    <ResourceCategory
      itemsCount={41}
      title="Resource name"
      fhirIcons={require('../../../assets/containers/ResourceCategory/resource-category.svg')}
    />
  );
};

export const ExampleWith1Item = () => {
  return (
    <ResourceCategory
      itemsCount={'1'}
      title="Resource name"
      fhirIcons={ResourceCategoryIcon}
    />
  );
};

export const ExampleWithoutItemsCount = () => {
  return <ResourceCategory title="Resource name" fhirIcons={fhirIcons} />;
};

export const ExampleWith1ItemAndDisableIcon = () => {
  return (
    <ResourceCategory
      itemsCount={'1'}
      title="Resource name"
      fhirIcons={false}
    />
  );
};
