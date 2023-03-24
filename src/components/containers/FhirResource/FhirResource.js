import React from 'react';
import * as FhirResourceTypes from '../../supportedFhirResourceList';
import ResourceContainer from '../ResourceContainer';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, error });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
    console.error(
      'An error occured when trying to render a FHIR Component:',
      error,
    );
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ResourceContainer {...this.props}>
          <FhirResourceTypes.Generic {...this.props} />
        </ResourceContainer>
      );
    }
    return this.props.children;
  }
}

function FhirResource(props) {
  const renderSwitch = () => {
    const { resourceType } = props.fhirResource || {};
    switch (resourceType) {
      case 'Binary':
        return <FhirResourceTypes.Binary {...props} />;
      default:
        const FhirComponent =
          FhirResourceTypes[resourceType] !== undefined
            ? FhirResourceTypes[resourceType]
            : FhirResourceTypes.Generic;
        return (
          <ResourceContainer {...props}>
            <FhirComponent {...props} />
          </ResourceContainer>
        );
    }
  };
  return <ErrorBoundary>{renderSwitch()}</ErrorBoundary>;
}

export default FhirResource;
