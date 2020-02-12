import { configure, addParameters, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import '../src/style.css';

addParameters({
  options: {
    name: 'FHIR-REACT storybook',
    showRoots: true,
  },
});

addDecorator(
  withKnobs({
    escapeHTML: false,
  }),
);

configure(require.context('../src', true, /\.stories\.js$/), module);
