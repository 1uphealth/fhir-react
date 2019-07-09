import React from 'react'

class Reference extends React.Component {
	constructor(props) {
    super(props);
  }

	render() {
		return (
			<span>
				<strong>{(_.get(this.props.fhirData, 'display') || '')}</strong>
				{(_.get(this.props.fhirData, 'display') ? ' ' : '')}
				{((_.get(this.props.fhirData, 'reference') || '') || '')}
			</span>
		);
	}
}

export default Reference
