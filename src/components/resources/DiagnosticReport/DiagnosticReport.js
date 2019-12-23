import React from 'react';
import PropTypes from 'prop-types';
import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import _get from 'lodash/get';
import _has from 'lodash/has';
import fhirTypes from '../fhirResourceTypes';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';

const commonDTO = fhirResource => {
  const title =
    _get(fhirResource, 'code.text') ||
    _get(fhirResource, 'code.display') ||
    _get(fhirResource, 'code.coding.0.display', null);
  const status = _get(fhirResource, 'status', '');
  const effectiveDateTime = _get(fhirResource, 'effectiveDateTime');
  const categoryCoding = _get(fhirResource, 'category.coding');
  const hasCategoryCoding = Array.isArray(categoryCoding);
  const conclusion = _get(fhirResource, 'conclusion');

  return {
    title,
    status,
    effectiveDateTime,
    categoryCoding,
    hasCategoryCoding,
    conclusion,
  };
};

const dstu2DTO = fhirResource => {
  const hasPerformer = _has(fhirResource, 'performer');
  const performer = _get(fhirResource, 'performer');
  return {
    hasPerformer,
    performer,
  };
};
const stu3DTO = fhirResource => {
  const hasPerformer = _has(fhirResource, 'performer.0.actor.display');
  const performer = _get(fhirResource, 'performer.0.actor');
  return {
    hasPerformer,
    performer,
  };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirTypes.DSTU2: {
      return {
        ...commonDTO(fhirResource),
        ...dstu2DTO(fhirResource),
      };
    }
    case fhirTypes.STU3: {
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
      };
    }

    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const DiagnosticReport = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="Encounter" />;
  }

  const {
    title,
    status,
    effectiveDateTime,
    categoryCoding,
    hasCategoryCoding,
    hasPerformer,
    conclusion,
    performer,
  } = fhirResourceData;
  return (
    <div>
      <div style={{ width: '100%', display: 'inline-block' }}>
        <h4 style={{ display: 'inline-block' }} data-testid="title">
          {title}
        </h4>
        &nbsp;({status}
        {effectiveDateTime && (
          <span className="text-muted" data-testid="effectiveDateTime">
            ,&nbsp;
            <Date fhirData={effectiveDateTime} />
          </span>
        )}
        )
      </div>
      {hasCategoryCoding && (
        <div data-testid="categoryCoding">
          {categoryCoding.map((coding, i) => (
            <Coding key={`item-${i}`} fhirData={coding} />
          ))}
        </div>
      )}
      {hasPerformer && (
        <div data-testid="performer">
          <Reference fhirData={performer} />
        </div>
      )}
      {conclusion && (
        <div data-testid="conclusion">
          <label>Conclusion: </label>
          &nbsp;{conclusion}
        </div>
      )}
    </div>
  );
};

DiagnosticReport.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf(['dstu2', 'stu3']),
};
export default DiagnosticReport;
