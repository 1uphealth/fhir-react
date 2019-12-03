import React from 'react';

class Img extends React.Component {
  render() {
    return (
      <div>
        <img
          style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
          src={`data:${this.props.fhirResource.contentType};base64, ${this.props.fhirResource.content}`}
          alt=""
        />
      </div>
    );
  }
}

export default Img;
