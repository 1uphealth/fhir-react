import React from 'react'

class Img extends React.Component {
	constructor(props) {
    super(props);
  }

	render() {
		return (
			<div>
				<img style={{marginLeft: 'auto',marginRight: 'auto',display: 'block'}} src={`data:${this.props.fhirResource.contentType};base64, ${this.props.fhirResource.content}`} />
			</div>
		);
	}
}

export default Img
