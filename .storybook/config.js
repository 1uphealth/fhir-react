import '../src/components/ui/bootstrap-reboot.min.css';
import '../src/style.css';
import '../src/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { addDecorator, addParameters, configure } from '@storybook/react';

import { withKnobs } from '@storybook/addon-knobs';

if (typeof document !== 'undefined') {
  require('bootstrap/dist/js/bootstrap.min.js');
}

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
