import React from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';

import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';

const AllergyIntolerance = props => {
  const { fhirResource } = props;

  const title =
    _get(fhirResource, 'substance.coding[0].display') ||
    _get(fhirResource, 'substance.text', '');
  const status = _get(fhirResource, 'status', '');
  const recordedDate = _get(fhirResource, 'recordedDate');
  const substanceCoding = _get(fhirResource, 'substance.coding');
  const hasSubstanceCoding = Array.isArray(substanceCoding);
  const hasReaction = _get(fhirResource, 'reaction.0.manifestation');
  const reaction = _get(fhirResource, 'reaction', []);
  const asserter = _get(fhirResource, 'asserter');
  return (
    <div>
      <div style={{ width: '100%', display: 'inline-block' }}>
        <h4 style={{ display: 'inline-block' }} data-testid="title">
          {title}
        </h4>{' '}
        (<span data-testid="status">{status}</span>
        <span className="text-muted" data-testid="recordedDate">
          {recordedDate && <>, recorded on {recordedDate}</>}
        </span>
        )
      </div>
      <div className="container pl-0 pr-0">
        {hasSubstanceCoding && (
          <div className="row pl-0 pr-0" data-testid="substance">
            {substanceCoding.map((item, i) => (
              <div key={`item-${i}`} className="col-12">
                <Coding fhirData={item} />
              </div>
            ))}
          </div>
        )}
        <div className="row pl-0 pr-0">
          {hasReaction && (
            <>
              <div className="col-12">
                <small className="text-muted text-uppercase">
                  <strong>Manifestation</strong>
                </small>
              </div>
              <div className="col-12" data-testid="manifestation">
                {reaction.map((reaction, i) => {
                  const manifestations = _get(reaction, 'manifestation', []);
                  return manifestations.map((manifestation, j) => {
                    const coding = _get(manifestation, 'coding', []);
                    return coding.map((item, c) => {
                      const severity = _get(item, 'severity');
                      return (
                        <div key={`item-${i}${j}${c}`}>
                          <Coding fhirData={item} />
                          {severity && <span>{severity} severity</span>}
                        </div>
                      );
                    });
                  });
                })}
              </div>
            </>
          )}
        </div>
        {asserter && (
          <div className="row">
            <div className="col-12-sm">
              <div>
                <small className="text-muted text-uppercase">
                  <strong>Asserted by:</strong>
                </small>{' '}
                {<Reference fhirData={asserter} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

AllergyIntolerance.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default AllergyIntolerance;
