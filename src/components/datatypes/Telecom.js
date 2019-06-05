import React from 'react'

class Telecom extends React.Component {
	constructor(props) {
    super(props);
  }

	render() {
		return (
			<span className='text-muted'>
				{`${(_.get(this.props.fhirData, 'value') || '')}`}
			</span>
		);
	}
}

export default Telecom
