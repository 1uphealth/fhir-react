import React from 'react'
var _ = require('lodash');
import ResourceContainer from '../container/ResourceContainer'
import Reference from '../datatypes/Reference'
import Coding from '../datatypes/Coding'
import Img from '../datatypes/Img'
import Pdf from '../datatypes/Pdf'
import BinaryText from '../datatypes/BinaryText'


class Binary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div >
      {(() => {
        switch (this.props.fhirResource.contentType) {
          case 'application/pdf':
            return <Pdf fhirResource={this.props.fhirResource}/>
          case 'image/jpeg':
            return <Img fhirResource={this.props.fhirResource}/>
          case 'application/xml':
            return <BinaryText fhirResource={this.props.fhirResource}/>
          case 'application/json':
            return <BinaryText fhirResource={this.props.fhirResource}/>
          default :
          null
        }
      })()}
      </div>
  );
}
}

export default Binary
