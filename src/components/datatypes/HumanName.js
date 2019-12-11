import React from 'react'

class HumanName extends React.Component {
	constructor(props) {
    super(props);
  }

	render() {
    if (!this.props.primary && this.props.primary !== 'undefined') {
			return (
				<span className='text-muted'>
					<strong>{`${_.get(this.props.fhirData, 'given') || ''} ${_.get(this.props.fhirData, 'family') || ''} ${(_.get(this.props.fhirData, 'suffix') || []).join(' ')}`}</strong>
					&nbsp;<small>({_.get(this.props.fhirData, 'use')})</small>
				</span>
			);
		} else {
			return (
				<span>
					<h4 style={{display: 'inline-block'}}>{`${_.get(this.props.fhirData, 'given') || ''} ${_.get(this.props.fhirData, 'family') || ''} ${(_.get(this.props.fhirData, 'suffix') || []).join(' ')}`}</h4>
					&nbsp; {_.get(this.props.fhirData, 'use') ? (<small>({_.get(this.props.fhirData, 'use')})</small>) : ''}
				</span>
			)

		}
	}
}

export default HumanName
