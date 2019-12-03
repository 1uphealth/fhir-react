import React from 'react';
import ResourceContainer from '../container/ResourceContainer';
import Coding from '../datatypes/Coding';
var _ = require('lodash');

class Procedure extends React.Component {
  render() {
    return (
      <div>
        <ResourceContainer {...this.props}>
          <div style={{ width: '100%', display: 'inline-block' }}>
            <h4 style={{ display: 'inline-block' }}>{`${_.get(
              this.props.fhirResource,
              'code.coding[0].display',
            ) || _.get(this.props.fhirResource, 'code.text')}`}</h4>
            &nbsp;({_.get(this.props.fhirResource, 'status') || ''}
            <span className="text-muted">
              {typeof _.get(this.props.fhirResource, 'performedDateTime') ===
              'undefined'
                ? ''
                : `, on ${_.get(this.props.fhirResource, 'performedDateTime')}`}
            </span>
            )
          </div>

          <div className="container">
            <div className="row">
              {typeof _.get(this.props.fhirResource, 'code.coding') ===
              'undefined'
                ? ''
                : _.get(this.props.fhirResource, 'code.coding').map(function(
                    coding,
                  ) {
                    return <Coding fhirData={coding} />;
                  })}
            </div>
          </div>
        </ResourceContainer>
      </div>
    );
  }
}
export default Procedure;
