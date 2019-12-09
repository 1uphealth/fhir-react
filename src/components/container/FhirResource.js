import React from 'react';
import Generic from '../resources/Generic';
import AllergyIntolerance from '../resources/AllergyIntolerance';
import Binary from '../resources/Binary';
import CarePlan from '../resources/CarePlan';
import Condition from '../resources/Condition';
import Device from '../resources/Device';
import DiagnosticReport from '../resources/DiagnosticReport';
import Encounter from '../resources/Encounter';
import FamilyMemberHistory from '../resources/FamilyMemberHistory';
import Goal from '../resources/Goal';
import Immunization from '../resources/Immunization';
import MedicationOrder from '../resources/MedicationOrder';
import MedicationStatement from '../resources/MedicationStatement';
import Observation from '../resources/Observation';
import Patient from '../resources/Patient';
import Practitioner from '../resources/Practitioner';
import Procedure from '../resources/Procedure';
import ResourceContainer from '../container/ResourceContainer';

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
      return <Generic {...this.props} />;
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
      case 'AllergyIntolerance':
        return <AllergyIntolerance {...this.props} />;
      case 'Binary':
        return <Binary {...this.props} />;
      case 'CarePlan':
        return <CarePlan {...this.props} />;
      case 'Condition':
        return (
          <ResourceContainer {...this.props}>
            <Condition {...this.props} />
          </ResourceContainer>
        );
      case 'Device':
        return <Device {...this.props} />;
      case 'DiagnosticReport':
        return <DiagnosticReport {...this.props} />;
      case 'Encounter':
        return <Encounter {...this.props} />;
      case 'FamilyMemberHistory':
        return <FamilyMemberHistory {...this.props} />;
      case 'Goal':
        return <Goal {...this.props} />;
      case 'Immunization':
        return <Immunization {...this.props} />;
      case 'MedicationOrder':
        return <MedicationOrder {...this.props} />;
      case 'MedicationStatement':
        return <MedicationStatement {...this.props} />;
      case 'Observation':
        return (
          <ResourceContainer {...this.props}>
            <Observation {...this.props} />
          </ResourceContainer>
        );
      case 'Patient':
        return <Patient {...this.props} />;
      case 'Practitioner':
        return <Practitioner {...this.props} />;
      case 'Procedure':
        return <Procedure {...this.props} />;
      default:
        return <Generic {...this.props} />;
    }
  }

  render() {
    return <ErrorBoundary>{this.renderSwitch()}</ErrorBoundary>;
  }
}

export default FhirResource;
