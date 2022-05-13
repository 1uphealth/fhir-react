import React from 'react';
import Img from '../../datatypes/Img';
import Pdf from '../../datatypes/Pdf';
import BinaryText from '../../datatypes/BinaryText';
import Accordion from '../../containers/Accordion/Accordion';
import { Body, Header } from '../../ui';

const Binary = props => {
  const { fhirResource, fhirIcons, rawOnClick, customId } = props;

  const loadBinaryFile = () => {
    switch (fhirResource.contentType) {
      case 'application/pdf':
        if (props.children && typeof props.children === 'function') {
          return props.children(fhirResource.content, fhirResource.contentType);
        }
        return <Pdf fhirResource={fhirResource} />;
      case 'image/jpeg':
        return <Img fhirResource={fhirResource} />;
      case 'application/xml':
        return <BinaryText fhirResource={fhirResource} />;
      case 'application/json':
        return <BinaryText fhirResource={fhirResource} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Accordion
        headerContent={
          <Header
            resourceName="Binary"
            title={`Binary file: ${fhirResource.contentType}`}
            icon={fhirIcons}
          />
        }
        bodyContent={<Body>{loadBinaryFile()}</Body>}
        rawOnClick={rawOnClick}
        customId={customId}
      />
    </div>
  );
};

export default Binary;
