import React from 'react'
var _ = require('lodash');
import HumanName from '../datatypes/HumanName'
import Telecom from '../datatypes/Telecom'
import Address from '../datatypes/Address'
import ResourceContainer from '../container/ResourceContainer'
import crypto from 'crypto'


class EachParticipant extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return(
      <div class="row col-sm-12 ">
      <div class="col-sm-3 " >
      {_.get(this.props.eachParticipant,'type[0].coding[0].display')}
      </div>
      <div class="col-sm-3" >
      {_.get(this.props.eachParticipant,'type[0].text')}
      </div>
      <div class="col-sm-6" >
      {new Date(_.get(this.props.eachParticipant,'period.start')).toLocaleString()}
      </div>
      </div>
  )}
}

class EncounterParticipants extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return(
      <div class="row col-sm-12 ">
      <div class="col-sm-12 " >
       <span class="text-muted"><strong>Participants:</strong></span>
      </div>
      <div class="col-sm-3 " >
       <span class="text-muted"><strong>Role</strong></span>
      </div>
      <div class="col-sm-3" >
       <span class="text-muted"><strong>Name</strong></span>
      </div>
      <div class="col-sm-6" >
       <span class="text-muted"><strong>Date</strong></span>
      </div>
      {this.props.allParticipant.map(function(eachParticipant){
            return   <EachParticipant eachParticipant={eachParticipant}/>
      })}
      </div>
  )}
}

class Encounter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let endDate = " - "
    if (this.props.fhirResource.period.end){
      endDate  = new Date(this.props.fhirResource.period.end ).toLocaleString();
    }else{
      endDate = " - "
    }
    let participantsComponent = ""
    if(this.props.fhirResource.participant){
      participantsComponent = <EncounterParticipants allParticipant={this.props.fhirResource.participant}/>
    }else{
      participantsComponent = ""
    }
    return (
      <div>
      <ResourceContainer fhirResource={this.props.fhirResource}>
        <div class="container ">
        	<div class="row">
        		<div class=" ">
              <div>
                <h4>{_.get(this.props.fhirResource,'location[0].location.display') }</h4>
                <div class="row">
                   <div class="col-sm-3" >
                    <span class="text-muted"><strong>Start Date </strong></span>
                   </div>
                   <div class="col-sm-9" >
                    { new Date(_.get(this.props.fhirResource,'period.start')).toLocaleString()}
                   </div>
                   <div class="col-sm-3" >
                    <span class="text-muted"><strong>End Date</strong></span>
                   </div>
                   <div class="col-sm-9" >
                    {endDate}
                   </div>
                   <div class="col-sm-3" >
                    <span class="text-muted"><strong>Class</strong></span>
                   </div>
                   <div class="col-sm-9" >
                    {_.get(this.props.fhirResource,'class')}
                   </div>
                   <div class="col-sm-3" >
                    <span class="text-muted"><strong>Status</strong></span>
                   </div>
                   <div class="col-sm-9" >
                    {_.get(this.props.fhirResource,'status')}
                   </div>
                   {participantsComponent}
                 </div>
              </div>
        		</div>
        	</div>
        </div>
      </ResourceContainer>
      </div>

    );
  }
}
export default Encounter
