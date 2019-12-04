import FhirResource from './components/container/FhirResource';
import Patient from './components/resources/Patient';
import MedicationStatement from './components/resources/MedicationStatement';
import MedicationOrder from './components/resources/MedicationOrder';
import Encounter from './components/resources/Encounter';

export const Resources = {
  Patient,
  Encounter,
  MedicationStatement,
  MedicationOrder,
};

export { FhirResource, MedicationStatement, Patient, MedicationOrder };
