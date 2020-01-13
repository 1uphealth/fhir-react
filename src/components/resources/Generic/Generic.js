import React from 'react';
import ResourceContainer from '../../containers/ResourceContainer';
import _get from 'lodash/get';

class Condition extends React.Component {
  render() {
    return (
      <div>
        <ResourceContainer {...this.props}>
          <div className="container">
            <h4>
              {`${this.props.fhirResource.resourceType}/${_get(
                this.props.fhirResource,
                'id',
              )}`}{' '}
              {_get(this.props.fhirResource, 'code.coding[0].display') ||
                _get(this.props.fhirResource, 'code.text') ||
                ''}
            </h4>
          </div>
        </ResourceContainer>
      </div>
    );
  }
}

export default Condition;
