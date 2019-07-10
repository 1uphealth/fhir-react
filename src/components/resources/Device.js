import React from 'react'
var _ = require('lodash');
import ResourceContainer from '../container/ResourceContainer'
import Reference from '../datatypes/Reference'
import Coding from '../datatypes/Coding'

class Device extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
      <ResourceContainer {...this.props}>
        <div style={{width:'100%', display:'inline-block'}}>
          <h4 style={{display: 'inline-block'}}>{`${this.props.fhirResource.model}`}</h4>
          &nbsp;({_.get(this.props.fhirResource,'status') || ''}
          <span className='text-muted'>{typeof _.get(this.props.fhirResource,'expiry') === 'undefined' ? '' : `, expires on ${_.get(this.props.fhirResource,'expiry')}`}</span>)
        </div>
        <div className="container">
        	<div className="row">
            { typeof _.get(this.props.fhirResource,'type.coding') === 'undefined' ? '' :
              (_.get(this.props.fhirResource,'type.coding').map(function(coding){
                return <Coding fhirData={coding} />
              }))
            }
        	</div>
          <div className="row">
            {
              typeof _.get(this.props.fhirResource, 'udi') === 'undefined' ? '' :
              (
                <span>
                  <small className='text-uppercase text-muted'><strong>universal device identifier</strong></small>
                  <small> {_.get(this.props.fhirResource, 'udi')}</small>
                </span>
              )
            }
          </div>
        </div>
      </ResourceContainer>
      </div>
    );
  }
}
export default Device
