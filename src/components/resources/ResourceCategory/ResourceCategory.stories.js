import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import ResourceCategory from './ResourceCategory';
import fhirIcons from '../../../fixtures/example-icons';
import ResourceCategoryIcon from '../../../assets/containers/ResourceCategory/resource-category.svg';

export default {
  title: 'ResourceCategory',
  component: ResourceCategory,
  argTypes: {
    ...defaultArgTypes,
    itemsCount: {
      table: {
        disable: true,
      },
    },
    title: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = args => <ResourceCategory {...args} />;

export const ExampleWithAllProperties = Template.bind({});
ExampleWithAllProperties.args = {
  itemsCount: 41,
  title: 'Resource name',
  fhirIcons: require('../../../assets/containers/ResourceCategory/resource-category.svg'),
};

export const ExampleWith1Item = Template.bind({});
ExampleWith1Item.args = {
  itemsCount: '1',
  title: 'Resource name',
  fhirIcons: ResourceCategoryIcon,
};

export const ExampleWithoutItemsCount = Template.bind({});
ExampleWithoutItemsCount.args = {
  title: 'Resource name',
  fhirIcons: fhirIcons,
};

export const ExampleWith1ItemAndDisableIcon = Template.bind({});
ExampleWith1ItemAndDisableIcon.args = {
  itemsCount: '1',
  title: 'Resource name',
  fhirIcons: false,
};
