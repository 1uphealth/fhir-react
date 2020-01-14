import React from 'react';
import ResourceContainer from '../../containers/ResourceContainer';
import _get from 'lodash/get';

class MedicationDetails extends React.Component {
  render() {
    return (
      <div>
        <h4>{this.props.medication} </h4>
      </div>
    );
  }
}

class MedicationOrder extends React.Component {
  render() {
    return (
      <div className="col-xs-8">
        <ResourceContainer {...this.props}>
          <div>
            <MedicationDetails
              medication={
                _get(this.props.fhirResource, 'medicationReference.display') ||
                _get(this.props.fhirResource, 'medicationCodeableConcept.text')
              }
            />
          </div>
          <div>
            {this.props.fhirResource.reasonCodeableConcept &&
            this.props.fhirResource.reasonCodeableConcept.coding ? (
              <div>
                {' '}
                <b>Reason:</b>{' '}
                {_get(
                  this.props.fhirResource.reasonCodeableConcept.coding[0],
                  'display',
                )}{' '}
              </div>
            ) : (
              ''
            )}
          </div>
          <div>
            {this.props.fhirResource.dosageInstruction &&
            this.props.fhirResource.dosageInstruction.length > 0 ? (
              <div>
                {' '}
                <b>Dosage Instruction:</b>{' '}
                {_get(this.props.fhirResource.dosageInstruction[0], 'text')}{' '}
              </div>
            ) : (
              ''
            )}
          </div>
          <div>
            {this.props.fhirResource.dosageInstruction &&
            this.props.fhirResource.dosageInstruction.length > 0 &&
            this.props.fhirResource.dosageInstruction[0]
              .additionalInstructions > 0 ? (
              <div>
                {' '}
                <b>Additional Information:</b>{' '}
                {_get(
                  this.props.fhirResource.dosageInstruction[0]
                    .additionalInstructions,
                  'text',
                )}{' '}
              </div>
            ) : (
              ''
            )}
          </div>
          <div>
            {this.props.fhirResource.dosageInstruction &&
            this.props.fhirResource.dosageInstruction.length > 0 &&
            this.props.fhirResource.dosageInstruction[0]
              .additionalInstructions ? (
              <div>
                {' '}
                <b>Additional Information:</b>{' '}
                {_get(
                  this.props.fhirResource.dosageInstruction[0]
                    .additionalInstructions,
                  'text',
                )}{' '}
              </div>
            ) : (
              ''
            )}
          </div>
          <div>
            <div>
              {this.props.fhirResource.dosageInstruction &&
              this.props.fhirResource.dosageInstruction.length > 0 &&
              this.props.fhirResource.dosageInstruction[0].route ? (
                <div>
                  {' '}
                  <b>Route:</b>{' '}
                  {_get(
                    this.props.fhirResource.dosageInstruction[0].route
                      .coding[0],
                    'display',
                  )}{' '}
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </ResourceContainer>
      </div>
    );
  }
}

export default MedicationOrder;
