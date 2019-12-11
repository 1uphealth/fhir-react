import React from 'react';

const UnhandledResourceDataStructure = ({ resourceName = '' }) => (
  <div>
    <h4>Unhandled data structure for {resourceName} resource component</h4>
    <small>
      Please check if component has proper <b>fhirVersion</b> property.
    </small>
  </div>
);

export default UnhandledResourceDataStructure;
