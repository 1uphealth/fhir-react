import '../src/components/ui/bootstrap-reboot.min.css';
import '../src/style.css';
import '../src/style.scss';

if (typeof document !== 'undefined') {
  require('bootstrap/dist/js/bootstrap.min.js');
}

export const parameters = {
  options: {
    storySort: {
      order: [
        'Patient',
        'Coverage',
        ['RelatedPerson', 'FamilyMemberHistory'],
        'ExplanationOfBenefit',
        ['ExplanationOfBenefitGraph', 'Claim', 'ClaimResponse'],
        'Immunization',
        'Observation',
        'Procedure',
        'Condition',
        'Encounter',
        'DiagnosticReport',
        'DocumentReference',
        'CarePlan',
        'Goal',
        'AllergyIntolerance',
        'AdverseEvent',
        'Device',
        'List',
        'Medication',
        'MedicationDispense',
        'MedicationAdministration',
        'MedicationOrder',
        'MedicationRequest',
        'MedicationStatement',
        'Practitioner',
        ['PractitionerRole'],
        'Organization',
        'CareTeam',
        'Appointment',
        'Bundle',
        'Binary',
        'ReferralRequest',
        'Questionnaire',
        'QuestionnaireResponse',
        'UnhandledResourceDataStructure',
        'Generic',
        'Location',
        'MedicationKnowledge',
        'ResearchStudy',
        'ResourceCategory',
      ],
    },
  },
};
