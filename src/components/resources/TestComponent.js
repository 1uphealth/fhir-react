import React from 'react'


class TestComponent extends React.Component {
  constructor(props) {
    super(props);
  }
   render() {
      return (
         <div>
            asd{this.props.data}
         </div>
      );
   }
}
export default TestComponent
