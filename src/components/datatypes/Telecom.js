import React from 'react'

class Telecom extends React.Component {
	constructor(props) {
    super(props);
  }

	render() {
		return (
			<div>
				{`${(_.get(this.props.fhirData, 'value') || '')}`}
			</div>
		);
	}
}

export default Telecom
