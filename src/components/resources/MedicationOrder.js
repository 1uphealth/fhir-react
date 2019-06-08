import React from 'react'
var _ = require('lodash');
import ResourceContainer from '../container/ResourceContainer'
import crypto from 'crypto'

var medicationOrderStyle = {
  "background-color": "#EFD6A6",
  "borderRadius": "10px",
  "padding": "10px",
  "textAlign": "left",
}

var medicationDetailsStyle = {color:"#40e0d0"}

class MedicationDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
       <h5 style={medicationDetailsStyle}>{this.props.medication} </h5>
       <h6><b>Expiration date:</b>{this.props.expiration} </h6>
      </div>
    )
  }
}

class MedicationOrder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='col-xs-8' style = {medicationOrderStyle}>
        <ResourceContainer fhirResource={this.props.fhirResource} >
          <div > 
              {this.props.fhirResource.medicationReference && this.props.fhirResource.medicationReference.display ? <MedicationDetails medication= {_.get(this.props.fhirResource.medicationReference, 'display')} expiration= {_.get(this.props.fhirResource.dispenseRequest.validityPeriod, 'end')}/> : ''}
          </div>
          <div>
             {this.props.fhirResource.reasonCodeableConcept && this.props.fhirResource.reasonCodeableConcept.coding ? <div> <b>Reason:</b> {_.get(this.props.fhirResource.reasonCodeableConcept.coding[0], 'display')} </div> : ''}
          </div>
          <div>
             {this.props.fhirResource.dosageInstruction && this.props.fhirResource.dosageInstruction.length > 0 ? <div> <b>Dosage Instruction:</b> {_.get(this.props.fhirResource.dosageInstruction[0], 'text')} </div> : ''}
          </div>
          <div>
             {this.props.fhirResource.dosageInstruction && this.props.fhirResource.dosageInstruction.length > 0 && this.props.fhirResource.dosageInstruction[0].additionalInstructions > 0 ? <div> <b>Additional Information:</b> {_.get(this.props.fhirResource.dosageInstruction[0].additionalInstructions, 'text')} </div> : ''}
          </div>
          <div>
             {this.props.fhirResource.dosageInstruction && this.props.fhirResource.dosageInstruction.length > 0 && this.props.fhirResource.dosageInstruction[0].additionalInstructions ? <div> <b>Additional Information:</b> {_.get(this.props.fhirResource.dosageInstruction[0].additionalInstructions, 'text')} </div> : ''}
          </div>
          <div>
            <div>
             {this.props.fhirResource.dosageInstruction && this.props.fhirResource.dosageInstruction.length > 0 && this.props.fhirResource.dosageInstruction[0].route ? <div> <b>Route:</b> {_.get(this.props.fhirResource.dosageInstruction[0].route.coding[0], 'display')} </div> : ''}
          </div>
          </div>
        </ResourceContainer>
      </div>
    );
  }
}

export default MedicationOrder ;
