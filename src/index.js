import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import FhirResource from './components/containers/FhirResource';
import fhirVersions from './components/resources/fhirResourceVersions';

let BootstrapLibrary;
if (typeof document !== 'undefined') {
  BootstrapLibrary = require('bootstrap/dist/js/bootstrap.min.js').default;
}

export { FhirResource, fhirVersions };
export * from './components/supportedFhirResourceList';
