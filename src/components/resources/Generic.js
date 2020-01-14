import React from 'react';
import ResourceContainer from '../containers/ResourceContainer';
var _ = require('lodash');

class Condition extends React.Component {
  render() {
    return (
      <div>
        <ResourceContainer {...this.props}>
          <div className="container">
            <h4>
              {`${this.props.fhirResource.resourceType}/${_.get(
                this.props.fhirResource,
                'id',
              )}`}{' '}
              {_.get(this.props.fhirResource, 'code.coding[0].display') ||
                _.get(this.props.fhirResource, 'code.text') ||
                ''}
            </h4>
          </div>
        </ResourceContainer>
      </div>
    );
  }
}

export default Condition;
