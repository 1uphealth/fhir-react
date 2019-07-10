import React from 'react'
var _ = require('lodash');
import ResourceContainer from '../container/ResourceContainer'
import Reference from '../datatypes/Reference'
import Coding from '../datatypes/Coding'
import Date from '../datatypes/Date'

class DiagnosticReport extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
      <ResourceContainer {...this.props}>
        <div style={{width:'100%', display:'inline-block'}}>
          <h4 style={{display: 'inline-block'}}>{`${this.props.fhirResource.code.text || this.props.fhirResource.code.display}`}</h4>
          &nbsp;({_.get(this.props.fhirResource,'status') || ''}
          <span className='text-muted'>,&nbsp;<Date fhirData={this.props.fhirResource.effectiveDateTime}/></span>)
        </div>
        {(_.get(this.props.fhirResource,'category.coding') || []).map(function(coding){
          return <Coding fhirData={coding} />
        })}
        <div className='card bg-white border-0 mt-2 mb-2'>
          <div className='card-body' dangerouslySetInnerHTML={ { __html: _.get(this.props.fhirResource,'text.div') || '' }} />
        </div>
        <Reference fhirData={_.get(this.props.fhirResource,'performer')} />
      </ResourceContainer>
      </div>
    );
  }
}
export default DiagnosticReport
