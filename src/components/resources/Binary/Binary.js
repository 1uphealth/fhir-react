import React from 'react';
import Img from '../../datatypes/Img';
import Pdf from '../../datatypes/Pdf';
import BinaryText from '../../datatypes/BinaryText';

const Binary = props => {
  const { fhirResource } = props;

  return (
    <div>
      {(() => {
        switch (fhirResource.contentType) {
          case 'application/pdf':
            if (props.children && typeof props.children === 'function') {
              return props.children(
                fhirResource.content,
                fhirResource.contentType,
              );
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
      })()}
    </div>
  );
};

export default Binary;
