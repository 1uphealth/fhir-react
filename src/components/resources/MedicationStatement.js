import React from 'react'
var _ = require('lodash');
import ResourceContainer from '../container/ResourceContainer'
import crypto from 'crypto'

class MedicationDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
       <h5>{this.props.medication} </h5>
       <h6><b>Expiration date:</b>{this.props.expiration} </h6>
      </div>
    )
  }
}

class MedicationStatement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='col-xs-12 col-md-6'>
        <ResourceContainer {...this.props} >
          <div style={{width:'100%', display:'inline-block'}}>
            <h4 style={{display: 'inline-block'}}>{`${_.get(this.props.fhirResource, 'medicationCodeableConcept.text') || _.get(this.props.fhirResource, 'medicationCodeableConcept.coding[0].display')}`}</h4>
            &nbsp;({_.get(this.props.fhirResource,'status') || ''}
            <span className='text-muted'>
              {typeof _.get(this.props.fhirResource,'status') === 'undefined' ? '' : `, status ${_.get(this.props.fhirResource,'status')}`}
              {(( typeof _.get(this.props.fhirResource,'effectivePeriod.start') === 'undefined') || (typeof _.get(this.props.fhirResource,'effectivePeriod.end') === 'undefined')) ? '' : `, from ${_.get(this.props.fhirResource,'effectivePeriod.start')} to ${_.get(this.props.fhirResource,'effectivePeriod.end')}`}
            </span>
            <span>{_.get(this.props.fhirResource,'reported') === true ? ' - self reported' : ''}</span>
            )
          </div>
          <div className='row'> {/*{this.props.fhirResource.contained[0].code.coding[0].display}*/}
              {this.props.fhirResource.contained ? this.props.fhirResource.contained.map(function(medication){
                if(medication.code && medication.code.coding && medication.code.coding.length > 0) {
                  return <MedicationDetails medication= {_.get(medication, 'code.coding[0].display')} expiration={_.get(medication, 'package.batch[0].expirationDate')}/>
                }
              }) : ''}
          </div>
          <div>
            {this.props.fhirResource.reasonCode ? this.props.fhirResource.reasonCode.map(function(reasonCode){
              if(reasonCode.coding && reasonCode.coding.length > 0)  {
                return (<p> <b>Reason:</b> {_.get(reasonCode, '.coding[0].display')}</p>)
              }
            }) : ''}
          </div>
          <div>
            {this.props.fhirResource.dosage ? this.props.fhirResource.dosage.map(function(dosage){
                return (
                  <div>
                    {_.get(dosage, 'text') ? (<p> <b>Dosage Instruction:</b> {_.get(dosage, 'text')} </p>) : ''}
                    {_.get(dosage, 'quantityQuantity.value') ? (<p> <b>Dosage Instruction:</b> {_.get(dosage, 'quantityQuantity.value')} </p>) : ''}
                    {_.get(dosage, 'additionalInstruction[0].text') ? <p> <b>Additional Instruction:</b> {_.get(dosage, 'additionalInstruction[0].text')} </p> : ''}
                    {_.get(dosage, 'route.coding[0].display') ? <p> <b>Route:</b> {_.get(dosage, 'route.coding[0].display')} </p> : ''}
                </div>)
            }) : ''}
          </div>
        </ResourceContainer>
      </div>
    );
  }
}

export default MedicationStatement ;
