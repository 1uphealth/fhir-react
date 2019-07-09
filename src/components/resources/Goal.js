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
      <ResourceContainer fhirResource={this.props.fhirResource}>
        <div style={{width:'100%', display:'inline-block'}}>
          <h4 style={{display: 'inline-block'}}>{`${_.get(this.props.fhirResource, 'note[0].text')}`}</h4>
          &nbsp;({_.get(this.props.fhirResource,'status') || ''}
          <span className='text-muted'>{typeof _.get(this.props.fhirResource,'status') === 'undefined' ? '' : `, status ${_.get(this.props.fhirResource,'status')} starting on  ${_.get(this.props.fhirResource,'startDate')}`}</span>)
        </div>
        <div className="container">
          <div className="row">
            {_.get(this.props.fhirResource,'description')}
          </div>
          <div className="row">
            { typeof _.get(this.props.fhirResource,'category') === 'undefined' ? '' :
              (_.get(this.props.fhirResource,'category').map(function(category){
                return (_.get(category,'coding') || []).map(function(coding){
                  return (<div>
                    <Coding fhirData={coding} />
                  </div>)
                })
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
          <div className="row">
            {
              typeof _.get(this.props.fhirResource, 'addresses') === 'undefined' ? '' :
              (
                <span>
                  <small className='text-uppercase text-muted'><strong>Addresses</strong></small>
                </span>
              )
            }
          </div>
          { typeof _.get(this.props.fhirResource,'addresses') === 'undefined' ? '' :
            ((_.get(this.props.fhirResource,'addresses') || []).map(function(addresses){
              return <div className="row"><div className="col-12 pl-0 pr-0"><Reference fhirData={addresses}/></div></div>
            }))
          }
          <br />
          <div className="row">
            {
              typeof _.get(this.props.fhirResource, 'author') === 'undefined' ? '' :
              (
                <span>
                  <small className='text-uppercase text-muted'><strong>Author</strong></small>
                </span>
              )
            }
          </div>
          { typeof _.get(this.props.fhirResource,'author') === 'undefined' ? '' :
            <div className="row"><div className="col-12 pl-0 pr-0"><Reference fhirData={_.get(this.props.fhirResource,'author')}/></div></div>
          }
        </div>
      </ResourceContainer>
      </div>
    );
  }
}
export default Device
