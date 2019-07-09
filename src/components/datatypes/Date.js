import React from 'react'

class Date extends React.Component {
	constructor(props) {
    super(props);
  }

	render() {
		return (
			<span>{this.props.fhirData.slice(0,10)}</span>
		);
	}
}

export default Date
