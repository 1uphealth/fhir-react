import React from 'react'
var _ = require('lodash');
import ResourceContainer from '../container/ResourceContainer'
import Reference from '../datatypes/Reference'
import Coding from '../datatypes/Coding'

class Condition extends React.Component {
  constructor(props) {
    super(props);
  }

	render() {
		return (
      <div>
  			<ResourceContainer {...this.props}>
          <div style={{width:'100%', display:'inline-block'}}>
            <h4 style={{display: 'inline-block'}}>{_.get(this.props.fhirResource,'code.coding[0].display') || _.get(this.props.fhirResource,'code.text') || ''}</h4>
            &nbsp;({_.get(this.props.fhirResource,'clinicalStatus') || ''}
            <span className='text-muted'>{typeof _.get(this.props.fhirResource,'severity.text') === 'undefined' ? '' : ` , ${_.get(this.props.fhirResource,'severity.text')} severity`}</span>)
          </div>
          <div className='container'>
            <div className='row pl-0 pr-0'>
              <div className='col-md-4'>
                {_.get(this.props.fhirResource, 'onsetDateTime') ?
                  (<div><small className='text-muted text-uppercase'><strong>Onset Date:</strong></small> {_.get(this.props.fhirResource, 'onsetDateTime') || ''}</div>) :
                ''}
              </div>
              <div className='col-md-4'>
                {_.get(this.props.fhirResource, 'dateRecorded') ?
                  (<div><small className='text-muted text-uppercase'><strong>Date recorded:</strong></small> {_.get(this.props.fhirResource, 'dateRecorded') || ''}</div>) :
                ''}
              </div>
              <div className='col-md-4'>
                {_.get(this.props.fhirResource, 'dateRecorded') ?
                  (<div><small className='text-muted text-uppercase'><strong>Date recorded:</strong></small> {_.get(this.props.fhirResource, 'dateRecorded') || ''}</div>) :
                ''}
              </div>
            </div>
            <div className='row'>
              <div className='col-12-sm'>
                {_.get(this.props.fhirResource, 'asserter') ?
                  (<div><small className='text-muted text-uppercase'><strong>Asserted by:</strong></small> {<Reference fhirData={_.get(this.props.fhirResource, 'asserter')}/> || ''}</div>) :
                ''}
              </div>
            </div>
          </div>
  			</ResourceContainer>
      </div>
		);
	}
}

export default Condition
