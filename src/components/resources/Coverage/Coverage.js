import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _has from 'lodash/has';
import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';
import { Root, Header, Title, Body, Value } from '../../ui';

const commonDTO = fhirResource => {
  const period = _has(fhirResource, 'period');
  const coverageFrom = _get(fhirResource, 'period.start');
  const coverageTo = _get(fhirResource, 'period.end');

  return {
    period,
    coverageFrom,
    coverageTo,
  };
};
const dstu2DTO = fhirResource => {
  const planId = _get(fhirResource, 'plan');
  const issuer = _get(fhirResource, 'issuer');
  const type = _get(fhirResource, 'type');
  return {
    issuer,
    planId,
    type,
  };
};
const stu3DTO = fhirResource => {
  const issuer = _get(fhirResource, 'payor.0');
  const planId = _get(fhirResource, 'grouping.plan');
  const type = _get(fhirResource, 'type.coding.0');
  const details = {
    planDescription: _get(fhirResource, 'grouping.planDisplay'),
    classDescription: _get(fhirResource, 'grouping.classDisplay'),
  };
  const hasDetails = Object.values(details).filter(item => !!item).length > 0;
  const extension = _get(fhirResource, 'extension');
  const hasExtension = Array.isArray(extension) && extension.length > 0;
  return {
    planId,
    issuer,
    type,
    details,
    hasDetails,
    extension,
    hasExtension,
  };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirVersions.DSTU2: {
      return {
        ...commonDTO(fhirResource),
        ...dstu2DTO(fhirResource),
      };
    }
    case fhirVersions.STU3: {
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
      };
    }

    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const Coverage = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="Coverage" />;
  }

  const {
    planId,
    issuer,
    period,
    coverageFrom,
    coverageTo,
    type,
    details,
    hasDetails,
    extension,
    hasExtension,
  } = fhirResourceData;

  return (
    <Root name="coverage">
      <Header>
        <Title>Plan: {planId}</Title>
      </Header>
      <Body>
        {issuer && (
          <Value label="Issuer" data-testid="issuer">
            <Reference fhirData={issuer} />
          </Value>
        )}
        {period && (
          <Value label="Coverage">
            {coverageFrom && (
              <span data-testid="coverageFrom">from: {coverageFrom}</span>
            )}{' '}
            {coverageTo && (
              <span data-testid="coverageTo">to: {coverageTo}</span>
            )}
          </Value>
        )}
        {type && (
          <Value label="Type of coverage" data-testid="type">
            <Coding fhirData={type} />
          </Value>
        )}
        {hasDetails && (
          <Value label="Details" data-testid="details">
            <span>{details.planDescription}</span>
            {details.classDescription && (
              <>
                {' | '}
                <span>{details.classDescription}</span>
              </>
            )}
          </Value>
        )}
        {hasExtension && (
          <Value label="Extension" data-testid="extensions">
            {extension.map((item, i) => (
              <Coding key={`item-${i}`} fhirData={item.valueCoding} />
            ))}
          </Value>
        )}
      </Body>
    </Root>
  );
};

Coverage.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirVersions.DSTU2, fhirVersions.STU3])
    .isRequired,
};

export default Coverage;
