import React from 'react';
import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
var _ = require('lodash');

class DiagnosticReport extends React.Component {
  render() {
    return (
      <div>
        <div style={{ width: '100%', display: 'inline-block' }}>
          <h4 style={{ display: 'inline-block' }} data-testid="title">{`${this
            .props.fhirResource.code.text ||
            this.props.fhirResource.code.display ||
            _.get(this.props.fhirResource, 'code.coding.0.display')}`}</h4>
          &nbsp;({_.get(this.props.fhirResource, 'status') || ''}
          <span className="text-muted" data-testid="effectiveDateTime">
            ,&nbsp;
            <Date fhirData={this.props.fhirResource.effectiveDateTime} />
          </span>
          )
        </div>
        <div data-testid="categoryCoding">
          {(_.get(this.props.fhirResource, 'category.coding') || []).map(
            function(coding) {
              return <Coding fhirData={coding} />;
            },
          )}
        </div>
        <div data-testid="performer">
          <Reference fhirData={_.get(this.props.fhirResource, 'performer')} />
        </div>
      </div>
    );
  }
}
export default DiagnosticReport;
