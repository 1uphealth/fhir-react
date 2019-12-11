import React from 'react';
import Coding from '../datatypes/Coding';
const _ = require('lodash');
import ResourceContainer from '../container/ResourceContainer';

class EachParticipant extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-3 ">
          {_.get(this.props.eachParticipant, 'type')
            ? _.get(this.props.eachParticipant, 'type[0].coding[0].display')
            : ''}
        </div>
        <div className="col-sm-3">
          {_.get(this.props.eachParticipant, 'type')
            ? _.get(this.props.eachParticipant, 'type[0].text')
            : ''}
        </div>
        <div className="col-sm-6">
          {new Date(
            _.get(this.props.eachParticipant, 'period.start')
          ).toLocaleString()}
        </div>
      </div>
    );
  }
}

class EncounterParticipants extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <span>
              <small className="text-uppercase">
                <strong>Participants</strong>
              </small>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 ">
            <span className="text-muted">
              <small className="text-uppercase">
                <strong>Role</strong>
              </small>
            </span>
          </div>
          <div className="col-sm-3">
            <span className="text-muted">
              <small className="text-uppercase">
                <strong>Name</strong>
              </small>
            </span>
          </div>
          <div className="col-sm-6">
            <span className="text-muted">
              <small className="text-uppercase">
                <strong>Date</strong>
              </small>
            </span>
          </div>
        </div>
        {this.props.allParticipant.map(function(eachParticipant, index) {
          return (
            <EachParticipant key={index} eachParticipant={eachParticipant} />
          );
        })}
      </div>
    );
  }
}

class TitleSection extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-sm-3">
        <span className="text-muted">
          <small className="text-uppercase">
            <strong>{this.props.title}</strong>
          </small>
        </span>
      </div>
    );
  }
}

class Encounter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let endDate = ' - ';
    if (_.get(this.props.fhirResource, 'period.end')) {
      endDate = new Date(
        _.get(this.props.fhirResource, 'period.end')
      ).toLocaleString();
    } else {
      endDate = ' - ';
    }
    let participantsComponent = '';
    if (this.props.fhirResource.participant) {
      participantsComponent = (
        <EncounterParticipants
          allParticipant={this.props.fhirResource.participant}
        />
      );
    } else {
      participantsComponent = '';
    }
    return (
      <div className="encounter-wrapper">
        <ResourceContainer {...this.props}>
          <div>
            {_.get(this.props.fhirResource, 'location[0].location.display') ? (
              <h4>
                {_.get(this.props.fhirResource, 'location[0].location.display')}
              </h4>
            ) : (
              ''
            )}
            {_.get(this.props.fhirResource, 'reason[0].coding[0].system') ? (
              <h4>
                {_.get(this.props.fhirResource, 'reason[0].coding[0].system')}
              </h4>
            ) : (
              ''
            )}
            <div className="row">
              <div className="col-sm-3">
                <span className="text-muted">
                  <small className="text-uppercase">
                    <strong>Start Date </strong>
                  </small>
                </span>
              </div>
              <div className="col-sm-9">
                {new Date(
                  _.get(this.props.fhirResource, 'period.start')
                ).toLocaleString()}
              </div>
              <div className="col-sm-3">
                <span className="text-muted">
                  <small className="text-uppercase">
                    <strong>End Date</strong>
                  </small>
                </span>
              </div>
              <div className="col-sm-9">{endDate}</div>
              <div className="col-sm-3">
                <span className="text-muted">
                  <small className="text-uppercase">
                    <strong>Class</strong>
                  </small>
                </span>
              </div>
              <div className="col-sm-9">
                {_.get(this.props.fhirResource, 'class')}
              </div>
              {/* Status */}
              {!_.get(this.props.fhirResource, 'status') ? (
                ''
              ) : (
                <TitleSection title="Status" />
              )}
              <div className="col-sm-9">
                {_.get(this.props.fhirResource, 'status')}
              </div>
              {/* Display this */}
              {!_.get(this.props.fhirResource, 'reason') ? (
                ''
              ) : (
                <TitleSection title="Display" />
              )}
              <div className="col-sm-9">
                {/* Loop through the codings and display them in a list */}
                {!_.get(this.props.fhirResource, 'reason')
                  ? ''
                  : this.props.fhirResource.reason.map(function(reason, index) {
                      if (reason !== 'undefined' && reason.coding) {
                        return (
                          <Coding
                            key={index}
                            fhirData={reason.coding[0]}
                            verticalView={false}
                          />
                        );
                      }
                    })}
              </div>
            </div>
          </div>
          {participantsComponent}
        </ResourceContainer>
      </div>
    );
  }
}
export default Encounter;
