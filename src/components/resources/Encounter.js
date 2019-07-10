import React from 'react'
var _ = require('lodash');
import ResourceContainer from '../container/ResourceContainer'
import crypto from 'crypto'


class EachParticipant extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return(
      <div className="row">
        <div className="col-sm-3 " >
          {_.get(this.props.eachParticipant,'type[0].coding[0].display')}
        </div>
        <div className="col-sm-3" >
          {_.get(this.props.eachParticipant,'type[0].text')}
        </div>
        <div className="col-sm-6" >
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
      <div>
        <div className="row">
          <span><small className="text-uppercase"><strong>Participants</strong></small></span>
        </div>
        <div className="row">
          <div className="col-sm-3 " >
           <span className="text-muted"><small className="text-uppercase"><strong>Role</strong></small></span>
          </div>
          <div className="col-sm-3" >
           <span className="text-muted"><small className="text-uppercase"><strong>Name</strong></small></span>
          </div>
          <div className="col-sm-6" >
           <span className="text-muted"><small className="text-uppercase"><strong>Date</strong></small></span>
          </div>
        </div>
        {this.props.allParticipant.map(function(eachParticipant){
          return <EachParticipant eachParticipant={eachParticipant}/>
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
      <ResourceContainer {...this.props}>
        <div className="container">
        	<div className="row">
        		<div className=" ">
              <div>
                <h4>{_.get(this.props.fhirResource,'location[0].location.display') }</h4>
                <div className="row">
                   <div className="col-sm-3" >
                    <span className="text-muted"><small className="text-uppercase"><strong>Start Date </strong></small></span>
                   </div>
                   <div className="col-sm-9" >
                    { new Date(_.get(this.props.fhirResource,'period.start')).toLocaleString()}
                   </div>
                   <div className="col-sm-3" >
                    <span className="text-muted"><small className="text-uppercase"><strong>End Date</strong></small></span>
                   </div>
                   <div className="col-sm-9" >
                    {endDate}
                   </div>
                   <div className="col-sm-3" >
                    <span className="text-muted"><small className="text-uppercase"><strong>Class</strong></small></span>
                   </div>
                   <div className="col-sm-9" >
                    {_.get(this.props.fhirResource,'class')}
                   </div>
                   <div className="col-sm-3" >
                    <span className="text-muted"><small className="text-uppercase"><strong>Status</strong></small></span>
                   </div>
                   <div className="col-sm-9" >
                    {_.get(this.props.fhirResource,'status')}
                   </div>
                 </div>
              </div>
        		</div>
        	</div>
          {participantsComponent}
        </div>
      </ResourceContainer>
      </div>

    );
  }
}
export default Encounter
