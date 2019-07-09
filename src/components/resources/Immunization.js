import React from 'react'
var _ = require('lodash');
import ResourceContainer from '../container/ResourceContainer'
import Reference from '../datatypes/Reference'
import Coding from '../datatypes/Coding'

class Immunization extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
      <ResourceContainer fhirResource={this.props.fhirResource}>
        <div style={{width:'100%', display:'inline-block'}}>
          <h4 style={{display: 'inline-block'}}>{`${_.get(this.props.fhirResource, 'vaccineCode.text') || _.get(this.props.fhirResource, 'vaccineCode.coding[0].display')}`}</h4>
          &nbsp;({_.get(this.props.fhirResource,'status') || ''}
          <span className='text-muted'>{typeof _.get(this.props.fhirResource,'status') === 'undefined' ? '' : `, status ${_.get(this.props.fhirResource,'status')} provided on ${_.get(this.props.fhirResource,'date')}`}</span>
          <span>{_.get(this.props.fhirResource,'reported') === true ? ' - self reported' : ''}</span>
          )
        </div>
        <div className="container">
          <div className="row">
            {_.get(this.props.fhirResource,'manufacturer.display')}
          </div>
          <div className="row">
            {
              typeof _.get(this.props.fhirResource, 'lotNumber') === 'undefined' ? '' :
                <span>lot number {_.get(this.props.fhirResource,'lotNumber')}&nbsp;</span>
            }
            {
              typeof _.get(this.props.fhirResource, 'expirationDate') === 'undefined' ? '' :
                <span>expires on {_.get(this.props.fhirResource,'expirationDate')}</span>
            }
          </div>
          <div className="row">
            {
              typeof _.get(this.props.fhirResource, 'doseQuantity') === 'undefined' ? '' :
                <span>dosage {_.get(this.props.fhirResource,'doseQuantity.value')}&nbsp;{_.get(this.props.fhirResource,'doseQuantity.unit')}</span>
            }
          </div>
          <br />
          <div className="row">
            {
              typeof _.get(this.props.fhirResource, 'requester') === 'undefined' ? '' :
              (
                <span>
                  <small className='text-uppercase text-muted'><strong>Requester</strong></small>
                </span>
              )
            }
          </div>
          { typeof _.get(this.props.fhirResource,'requester') === 'undefined' ? '' :
            <div className="row"><div className="col-12 pl-0 pr-0"><Reference fhirData={_.get(this.props.fhirResource,'requester')}/></div></div>
          }
          <div className="row">
            {
              typeof _.get(this.props.fhirResource, 'performer') === 'undefined' ? '' :
              (
                <span>
                  <small className='text-uppercase text-muted'><strong>Performer</strong></small>
                </span>
              )
            }
          </div>
          { typeof _.get(this.props.fhirResource,'performer') === 'undefined' ? '' :
            <div className="row"><div className="col-12 pl-0 pr-0"><Reference fhirData={_.get(this.props.fhirResource,'performer')}/></div></div>
          }
          <br />
          <div className="row">
            {
              typeof _.get(this.props.fhirResource, 'route') === 'undefined' ? '' :
              (
                <span>
                  <small className='text-uppercase text-muted'><strong>Route</strong></small>
                </span>
              )
            }
          </div>
          <div className="row">
            { typeof _.get(this.props.fhirResource,'route') === 'undefined' ? '' :
              (_.get(this.props.fhirResource,'route.coding') || []).map(function(coding){
                return (<div>
                  <Coding fhirData={coding} />
                </div>)
               })
            }
          </div>
          <br />
          <div className="row">
            {
              typeof _.get(this.props.fhirResource, 'site') === 'undefined' ? '' :
              (
                <span>
                  <small className='text-uppercase text-muted'><strong>Site</strong></small>
                </span>
              )
            }
          </div>
          <div className="row">
            { typeof _.get(this.props.fhirResource,'site') === 'undefined' ? '' :
              (_.get(this.props.fhirResource,'site.coding') || []).map(function(coding){
                return (<div>
                  <Coding fhirData={coding} />
                </div>)
               })
            }
          </div>
          <div className='card bg-white border-0 mt-2 mb-2'>
            <div className='card-body' dangerouslySetInnerHTML={ { __html: _.get(this.props.fhirResource,'text.div') || '' }} />
          </div>
        </div>
      </ResourceContainer>
      </div>
    );
  }
}
export default Immunization
