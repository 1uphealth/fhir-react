import React from 'react'
var _ = require('lodash');
import ResourceContainer from '../container/ResourceContainer'
import Reference from '../datatypes/Reference'
import Coding from '../datatypes/Coding'

// {
//   "detail": {
//     "category": {
//       "coding": [
//         {
//           "system": "http://hl7.org/fhir/care-plan-activity-category",
//           "code": "other",
//           "display": "Other"
//         }
//       ],
//       "text": "other"
//     },
//     "prohibited": false,
//     "code": {
//       "text": "CT abdomen with contrast"
//     }
//   }
// },

class FamilyMemberHistoryAddresses extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='mb-2'>
        <h6 className='mb-0'><strong>{_.get(this.props.fhirData,'detail.code.text') || _.get(this.props.fhirData,'detail.code.coding[0].code')}</strong></h6>
        { typeof _.get(this.props.fhirData,'detail.category') === 'undefined' ? '' :
          (
            (_.get(this.props.fhirData,'detail.category').coding || []).map(function(coding){
              return <Coding fhirData={coding} />
            })
          )
        }
      </div>
    );
  }
}

class FamilyMemberHistoryActivity extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='mb-2'>
        <h6 className='mb-0'><strong>{_.get(this.props.fhirData,'detail.code.text') || _.get(this.props.fhirData,'detail.code.coding[0].code')}</strong></h6>
        { typeof _.get(this.props.fhirData,'detail.category') === 'undefined' ? '' :
          (
            (_.get(this.props.fhirData,'detail.category').coding || []).map(function(coding){
              return <Coding fhirData={coding} />
            })
          )
        }
      </div>
    );
  }
}

class FamilyMemberHistory extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ResourceContainer fhirResource={this.props.fhirResource}>
          <div style={{width:'100%', display:'inline-block'}}>
            <h4 style={{display: 'inline-block'}}>{`${_.get(this.props.fhirResource, 'condition[0].code.text') || _.get(this.props.fhirResource, 'condition[0].code.coding[0].display')}`}</h4>
            &nbsp;({_.get(this.props.fhirResource,'relationship.coding[0].display') || _.get(this.props.fhirResource,'relationship.text') || ''}
            <span className='text-muted'>{typeof _.get(this.props.fhirResource,'date') === 'undefined' ? '' : `, on ${_.get(this.props.fhirResource,'date')}`}</span>)
          </div>
          <div className="container">
            <div className="row">
              { typeof _.get(this.props.fhirResource,'condition[0].note.text') === 'undefined' ? '' :
                (_.get(this.props.fhirResource,'condition[0].note.text'))
              }
            </div>
            <div className="row">
              {
                typeof _.get(this.props.fhirResource, 'status') === 'undefined' ? '' :
                (
                  <span>
                    <small className='text-uppercase text-muted'><strong>Status</strong></small>
                  </span>
                )
              }
            </div>
          	<div className="row">
              { typeof _.get(this.props.fhirResource,'status') === 'undefined' ? '' :
                (_.get(this.props.fhirResource,'status'))
              }
          	</div>
          </div>
        </ResourceContainer>
      </div>
    );
  }
}
export default FamilyMemberHistory
