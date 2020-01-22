import React from 'react';
import Appointment from '../../resources/Appointment';
import Generic from '../../resources/Generic';
import AdverseEvent from '../../resources/AdverseEvent';
import AllergyIntolerance from '../../resources/AllergyIntolerance/AllergyIntolerance';
import Binary from '../../resources/Binary';
import CarePlan from '../../resources/CarePlan';
import CareTeam from '../../resources/CareTeam';
import Claim from '../../resources/Claim';
import Condition from '../../resources/Condition';
import Device from '../../resources/Device';
import DiagnosticReport from '../../resources/DiagnosticReport';
import DocumentReference from '../../resources/DocumentReference';
import Encounter from '../../resources/Encounter';
import FamilyMemberHistory from '../../resources/FamilyMemberHistory';
import Goal from '../../resources/Goal';
import Immunization from '../../resources/Immunization';
import Location from '../../resources/Location';
import Medication from '../../resources/Medication';
import MedicationOrder from '../../resources/MedicationOrder';
import MedicationStatement from '../../resources/MedicationStatement';
import Observation from '../../resources/Observation';
import Patient from '../../resources/Patient';
import Practitioner from '../../resources/Practitioner';
import Procedure from '../../resources/Procedure';
import ExplanationOfBenefit from '../../resources/ExplanationOfBenefit';
import Coverage from '../../resources/Coverage';
import MedicationDispense from '../../resources/MedicationDispense';
import Organization from '../../resources/Organization';
import MedicationRequest from '../../resources/MedicationRequest';
import MedicationAdministration from '../../resources/MedicationAdministration';
import ReferralRequest from '../../resources/ReferralRequest';
import ResourceContainer from '../ResourceContainer';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ResourceContainer {...this.props}>
          <Generic {...this.props} />
        </ResourceContainer>
      );
    }
    return this.props.children;
  }
}

class FhirResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  renderSwitch() {
    switch (this.props.fhirResource.resourceType) {
      case 'AdverseEvent':
        return (
          <ResourceContainer {...this.props}>
            <AdverseEvent {...this.props} />
          </ResourceContainer>
        );
      case 'AllergyIntolerance':
        return (
          <ResourceContainer {...this.props}>
            <AllergyIntolerance {...this.props} />
          </ResourceContainer>
        );
      case 'Appointment':
        return (
          <ResourceContainer {...this.props}>
            <Appointment {...this.props} />
          </ResourceContainer>
        );
      case 'Binary':
        return <Binary {...this.props} />;
      case 'CarePlan':
        return (
          <ResourceContainer {...this.props}>
            <CarePlan {...this.props} />
          </ResourceContainer>
        );
      case 'CareTeam':
        return (
          <ResourceContainer {...this.props}>
            <CareTeam {...this.props} />
          </ResourceContainer>
        );
      case 'Claim':
        return (
          <ResourceContainer {...this.props}>
            <Claim {...this.props} />
          </ResourceContainer>
        );
      case 'Condition':
        return (
          <ResourceContainer {...this.props}>
            <Condition {...this.props} />
          </ResourceContainer>
        );
      case 'Device':
        return (
          <ResourceContainer {...this.props}>
            <Device {...this.props} />
          </ResourceContainer>
        );
      case 'DiagnosticReport':
        return (
          <ResourceContainer {...this.props}>
            <DiagnosticReport {...this.props} />
          </ResourceContainer>
        );
      case 'DocumentReference':
        return (
          <ResourceContainer {...this.props}>
            <DocumentReference {...this.props} />
          </ResourceContainer>
        );
      case 'Encounter':
        return (
          <ResourceContainer {...this.props}>
            <Encounter {...this.props} />
          </ResourceContainer>
        );
      case 'FamilyMemberHistory':
        return (
          <ResourceContainer {...this.props}>
            <FamilyMemberHistory {...this.props} />
          </ResourceContainer>
        );
      case 'Goal':
        return (
          <ResourceContainer {...this.props}>
            <Goal {...this.props} />
          </ResourceContainer>
        );
      case 'Immunization':
        return (
          <ResourceContainer {...this.props}>
            <Immunization {...this.props} />
          </ResourceContainer>
        );
      case 'Location':
        return (
          <ResourceContainer {...this.props}>
            <Location {...this.props} />
          </ResourceContainer>
        );
      case 'Medication':
        return (
          <ResourceContainer {...this.props}>
            <Medication {...this.props} />
          </ResourceContainer>
        );
      case 'MedicationOrder':
        return (
          <ResourceContainer {...this.props}>
            <MedicationOrder {...this.props} />
          </ResourceContainer>
        );
      case 'MedicationStatement':
        return (
          <ResourceContainer {...this.props}>
            <MedicationStatement {...this.props} />
          </ResourceContainer>
        );
      case 'Observation':
        return (
          <ResourceContainer {...this.props}>
            <Observation {...this.props} />
          </ResourceContainer>
        );
      case 'Patient':
        return (
          <ResourceContainer {...this.props}>
            <Patient {...this.props} />
          </ResourceContainer>
        );
      case 'Practitioner':
        return (
          <ResourceContainer {...this.props}>
            <Practitioner {...this.props} />
          </ResourceContainer>
        );
      case 'Procedure':
        return (
          <ResourceContainer {...this.props}>
            <Procedure {...this.props} />
          </ResourceContainer>
        );
      case 'ExplanationOfBenefit':
        return (
          <ResourceContainer {...this.props}>
            <ExplanationOfBenefit {...this.props} />
          </ResourceContainer>
        );
      case 'Coverage':
        return (
          <ResourceContainer {...this.props}>
            <Coverage {...this.props} />
          </ResourceContainer>
        );
      case 'MedicationDispense':
        return (
          <ResourceContainer {...this.props}>
            <MedicationDispense {...this.props} />
          </ResourceContainer>
        );
      case 'Organization':
        return (
          <ResourceContainer {...this.props}>
            <Organization {...this.props} />
          </ResourceContainer>
        );
      case 'MedicationRequest':
        return (
          <ResourceContainer {...this.props}>
            <MedicationRequest {...this.props} />
          </ResourceContainer>
        );
      case 'MedicationAdministration':
        return (
          <ResourceContainer {...this.props}>
            <MedicationAdministration {...this.props} />
          </ResourceContainer>
        );
      case 'ReferralRequest':
        return (
          <ResourceContainer {...this.props}>
            <ReferralRequest {...this.props} />
          </ResourceContainer>
        );
      default:
        return (
          <ResourceContainer {...this.props}>
            <Generic {...this.props} />
          </ResourceContainer>
        );
    }
  }

  render() {
    return <ErrorBoundary>{this.renderSwitch()}</ErrorBoundary>;
  }
}

export default FhirResource;
