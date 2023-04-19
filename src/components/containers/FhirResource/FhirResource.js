import React, { useState } from 'react';
import * as FhirResourceTypes from '../../supportedFhirResourceList';
import ResourceContainer from '../ResourceContainer';

const ErrorBoundary = props => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState();

  const errCheck = () => {
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <ResourceContainer>
          <FhirResourceTypes.Generic />
        </ResourceContainer>
      );
    }
    return props.children;
  };

  try {
    const content = errCheck();
    return content;
  } catch (err) {
    setError(err);
    setHasError(true);
    console.error(
      'An error occured when trying to render a FHIR Component:',
      error,
    );
    const content = errCheck();
    return content;
  }
};

class FhirResource extends React.Component {
  renderSwitch() {
    const { resourceType } = this.props.fhirResource || {};
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
