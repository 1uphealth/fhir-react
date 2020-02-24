import { configure, addParameters, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import '../src/components/ui/bootstrap-reboot.min.css';
import '../src/style.css';

addParameters({
  options: {
    name: 'FHIR-REACT storybook',
    showRoots: true,
  },
});

addDecorator(withKnobs);

configure(require.context('../src', true, /\.stories\.js$/), module);
