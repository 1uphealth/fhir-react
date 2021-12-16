import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import './style.scss';

import FhirResource from './components/containers/FhirResource';
import fhirVersions from './components/resources/fhirResourceVersions';

if (typeof document !== 'undefined') {
  require('bootstrap/dist/js/bootstrap.min.js');
}

export { FhirResource, fhirVersions };
export * from './components/supportedFhirResourceList';
