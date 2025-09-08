import React from 'react';
import './CodeBlock.css';

type Resource = {
  code?: String
};

const ResourceContainer = (props: Resource) => (
  <pre className="fhir-container__CodeBlock">
    {JSON.stringify(props.code, null, 2)}
  </pre>
);

export default ResourceContainer;
