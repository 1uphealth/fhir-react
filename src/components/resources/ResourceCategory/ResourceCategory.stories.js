import React from 'react';
import ResourceCategory from './ResourceCategory';
import fhirIcons from '../../../fixtures/example-icons';

export default { title: 'ResourceCategory' };

export const ExampleWithAllProperties = () => {
  return (
    <ResourceCategory
      itemsCount={41}
      title="Resource name"
      fhirIcons={fhirIcons}
    />
  );
};

export const ExampleWith1Item = () => {
  return (
    <ResourceCategory
      itemsCount={'1'}
      title="Resource name"
      fhirIcons={fhirIcons}
    />
  );
};

export const ExampleWithoutItemsCount = () => {
  return <ResourceCategory title="Resource name" fhirIcons={fhirIcons} />;
};
