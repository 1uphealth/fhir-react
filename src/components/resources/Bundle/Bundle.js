import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import fhirVersions from '../fhirResourceVersions';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import { Root, Header, Title, Badge, Body, BadgeSecondary } from '../../ui';
import * as FhirResourceTypes from '../../supportedFhirResourceList';

import './Bundle.css';

export default function Bundle(props) {
  const commonDTO = fhirResource => {
    const type = _get(fhirResource, 'type', null);
    const total = _get(fhirResource, 'total');
    const entries = _get(fhirResource, 'entry', []);

    return {
      type,
      total,
      entries,
    };
  };

  const resourceDTO = (fhirVersion, fhirResource) => {
    switch (fhirVersion) {
      case fhirVersions.DSTU2:
      case fhirVersions.STU3:
      case fhirVersions.R4: {
        return {
          ...commonDTO(fhirResource),
        };
      }
      default:
        throw Error('Unrecognized the fhir version property type.');
    }
  };

  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="Bundle" />;
  }

  const { type, total, entries } = fhirResourceData;

  const resources = entries
    .map(entry => entry.resource || entry)
    .filter(Boolean);

  return (
    <Root name="Bundle">
      <Header>
        {type && <Title data-testid="title">{type}</Title>}
        {total && <Badge data-testid="total">{total}</Badge>}
      </Header>
      <Body>
        {resources.length > 0 &&
          resources.map((resource, index) => {
            const resourceType = resource.resourceType;
            const FhirComponent =
              FhirResourceTypes[resourceType] !== undefined
                ? FhirResourceTypes[resourceType]
                : FhirResourceTypes.Generic;

            return (
              <div
                className="fhir-resource__Bundle__item"
                key={`${resource.id}-${index}`}
              >
                {resourceType && (
                  <BadgeSecondary data-testid="resourceType">
                    {resourceType}
                  </BadgeSecondary>
                )}
                <FhirComponent
                  fhirResource={resource}
                  fhirVersion={fhirVersion}
                />
              </div>
            );
          })}
      </Body>
    </Root>
  );
}

Bundle.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]),
};
