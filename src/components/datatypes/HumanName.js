import React from 'react'

class HumanName extends React.Component {
	constructor(props) {
    super(props);
  }

	render() {
		if (this.props.index === 0) {
			return (
				<span>
					<h3 style={{display: 'inline-block'}}>{`${_.get(this.props.fhirData, 'given') || ''} ${_.get(this.props.fhirData, 'family') || ''}`}</h3>
					&nbsp;({_.get(this.props.fhirData, 'use')})
				</span>
			)

		} else {
			return (
				<span>
					<h5 style={{display: 'inline-block'}}>{`${_.get(this.props.fhirData, 'given') || ''} ${_.get(this.props.fhirData, 'family') || ''}`}</h5>
					&nbsp;({_.get(this.props.fhirData, 'use')})
				</span>
			);
		}
	}
}

export default HumanName
