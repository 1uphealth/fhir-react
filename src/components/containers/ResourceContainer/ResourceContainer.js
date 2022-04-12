import React, { Children, cloneElement, useState } from 'react';
import CodeBlock from '../CodeBlock';
import './ResourceContainer.css';

const ResourceContainer = ({ fhirResource, children, jsonOpen }) => {
  const [openJson, setOpenJson] = useState(jsonOpen ?? false);

  return (
    <div className="fhir-container__ResourceContainer__card">
      <div className="fhir-container__ResourceContainer__card-body">
        {Children.map(children, child => {
          return cloneElement(
            child,
            {
              rawOnClick: () => {
                setOpenJson(!openJson);
              },
            },
            null,
          );
        })}
        <div
          className={
            openJson
              ? 'fhir-container__ResourceContainer__json--visible'
              : 'fhir-container__ResourceContainer__json--hidden'
          }
        >
          <CodeBlock code={fhirResource} />
        </div>
      </div>
    </div>
  );
};

export default ResourceContainer;
