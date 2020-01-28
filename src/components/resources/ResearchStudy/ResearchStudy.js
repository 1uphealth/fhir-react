import React from 'react';
import PropTypes from 'prop-types';
import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import _get from 'lodash/get';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';

import { Badge, Body, Header, Root, Title, Value } from '../../ui';

const commonDTO = fhirResource => {
  const title = _get(fhirResource, 'title');
  const status = _get(fhirResource, 'status');
  const categoryCoding = _get(fhirResource, 'category[0].coding[0]');
  const focusCoding = _get(fhirResource, 'focus[0].coding[0]');
  const protocolReference = _get(fhirResource, 'protocol');
  const partOfReference = _get(fhirResource, 'partOf');

  return {
    title,
    status,
    categoryCoding,
    focusCoding,
    protocolReference,
    partOfReference,
  };
};
const resourceDTO = (fhirVersion, fhirResource) => {
  return commonDTO(fhirResource);
};

const ResearchStudy = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="ResearchStudy" />;
  }
  const {
    title,
    status,
    categoryCoding,
    focusCoding,
    protocolReference,
    partOfReference,
  } = fhirResourceData;

  return (
    <Root name="ResearchStudy">
      <Header>
        {title && <Title data-testid="title">{title}</Title>}
        <Badge data-testid="status">{status}</Badge>
      </Header>
      <Body>
        {categoryCoding && (
          <Value label="Category" data-testid="category">
            <Coding fhirData={categoryCoding} />
          </Value>
        )}
        {focusCoding && (
          <Value label="Focus" data-testid="focus">
            <Coding fhirData={focusCoding} />
          </Value>
        )}
        {protocolReference && (
          <Value label="Protocol" data-testid="protocol">
            <Reference fhirData={protocolReference} />
          </Value>
        )}
        {partOfReference && (
          <Value label="Part of study" data-testid="partOf">
            <Reference fhirData={partOfReference} />
          </Value>
        )}
      </Body>
    </Root>
  );
};

ResearchStudy.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirVersions.STU3]),
};

export default ResearchStudy;
