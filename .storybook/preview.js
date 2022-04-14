import '../src/components/ui/bootstrap-reboot.min.css';
import '../src/style.css';
import '../src/style.scss';

import { addDecorator, addParameters } from '@storybook/react';

if (typeof document !== 'undefined') {
  require('bootstrap/dist/js/bootstrap.min.js');
}

// addParameters({
//   options: {
//     name: 'FHIR-REACT storybook',
//     showRoots: true,
//   },
// });
