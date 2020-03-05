import FhirResource from './components/containers/FhirResource';
import fhirVersions from './components/resources/fhirResourceVersions';
import Patient from './components/resources/Patient';
import MedicationStatement from './components/resources/MedicationStatement';
import MedicationOrder from './components/resources/MedicationOrder';
import Encounter from './components/resources/Encounter';

import './style.css';

export const Resources = {
  Patient,
  Encounter,
  MedicationStatement,
  MedicationOrder,
};

export {
  FhirResource,
  fhirVersions,
  MedicationStatement,
  Patient,
  MedicationOrder,
};
