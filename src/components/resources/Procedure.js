import React from 'react'
var _ = require('lodash');
import ResourceContainer from '../container/ResourceContainer'
import Reference from '../datatypes/Reference'
import Coding from '../datatypes/Coding'

class Procedure extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
      <ResourceContainer fhirResource={this.props.fhirResource}>
        <div style={{width:'100%', display:'inline-block'}}>
          <h4 style={{display: 'inline-block'}}>{`${_.get(this.props.fhirResource, 'code.coding[0].display') || _.get(this.props.fhirResource, 'code.text')}`}</h4>
          &nbsp;({_.get(this.props.fhirResource,'status') || ''}
          <span className='text-muted'>{typeof _.get(this.props.fhirResource,'performedDateTime') === 'undefined' ? '' : `, on ${_.get(this.props.fhirResource,'performedDateTime')}`}</span>)
        </div>

        <div className="container">
        	<div className="row">
            { typeof _.get(this.props.fhirResource,'code.coding') === 'undefined' ? '' :
              (_.get(this.props.fhirResource,'code.coding').map(function(coding){
                return <Coding fhirData={coding} />
              }))
            }
        	</div>
        </div>
      </ResourceContainer>
      </div>
    );
  }
}
export default Procedure
