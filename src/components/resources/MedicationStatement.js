import React from 'react'
var _ = require('lodash');
import ResourceContainer from '../container/ResourceContainer'
import crypto from 'crypto'

var medicationStyle = {
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

class MedicationStatement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='col-xs-8' style = {medicationStyle}>
        <ResourceContainer fhirResource={this.props.fhirResource} >
          <div > {/*{this.props.fhirResource.contained[0].code.coding[0].display}*/}
              {this.props.fhirResource.contained ? this.props.fhirResource.contained.map(function(medication){
                if(medication.code && medication.code.coding && medication.code.coding.length > 0) {
                  return <MedicationDetails medication= {_.get(medication.code.coding[0], 'display')} expiration={_.get(medication.package.batch[0], 'expirationDate')}/>
                }
              }) : ''}
          </div>
          <div>
            {this.props.fhirResource.reasonCode ? this.props.fhirResource.reasonCode.map(function(reasonCode){
              if(reasonCode.coding && reasonCode.coding.length > 0)  {
                return (<p> <b>Reason:</b> {_.get(reasonCode.coding[0], 'display')}</p>)
              }
            }) : ''}
          </div>
          <div>
            {this.props.fhirResource.dosage ? this.props.fhirResource.dosage.map(function(dosage){
                return (
                  <div>
                    <p> <b>Dosage Instruction:</b> {_.get(dosage, 'text')} </p>
                    {dosage.additionalInstruction[0] ? <p> <b>Additional Instruction:</b> {_.get(dosage.additionalInstruction[0], 'text')} </p> : ''}
                    {dosage.route.coding[0] ? <p> <b>Route:</b> {_.get(dosage.route.coding[0], 'display')} </p> : ''}
                </div>)
            }) : ''}
          </div>
        </ResourceContainer>
      </div>
    );
  }
}

export default MedicationStatement ;
