import React from 'react'

class Fancy extends React.Component {
	render() {
		return (
			<div>
				<div>This is so Fanc!!y! Awesome123!</div>
				<button onClick={this.buttonClicked.bind(this)}>Click me</button>
			</div>
		);
	}

	buttonClicked() {
		this.props.textLog()
	}
}

export default Fancy
