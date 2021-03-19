import React from 'react';
import * as FhirResourceTypes from '../../supportedFhirResourceList';
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
          <FhirResourceTypes.Generic {...this.props} />
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
    const { resourceType } = this.props.fhirResource;
    switch (resourceType) {
      case 'Binary':
        return <FhirResourceTypes.Binary {...this.props} />;
      default:
        const FhirComponent =
          FhirResourceTypes[resourceType] !== undefined
            ? FhirResourceTypes[resourceType]
            : FhirResourceTypes.Generic;
        return (
          <ResourceContainer {...this.props}>
            <FhirComponent {...this.props} />
          </ResourceContainer>
        );
    }
  }

  render() {
    return <ErrorBoundary>{this.renderSwitch()}</ErrorBoundary>;
  }
}

export default FhirResource;
