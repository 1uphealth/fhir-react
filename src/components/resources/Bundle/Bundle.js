import React from 'react';
import _get from 'lodash/get';

import fhirVersions from '../fhirResourceVersions';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import { Root, Header, Title, Badge, Body, BadgeSecondary } from '../../ui';
import { FhirResource } from '../../../index';

import './Bundle.css';

const Bundle = props => {
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
    .map(entry => entry.resource || null)
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
            return (
              <div
                className="fhir-resource__Bundle__item"
                key={resource.id || index}
              >
                {resource.resourceType && (
                  <BadgeSecondary data-testid="resourceType">
                    {resource.resourceType}
                  </BadgeSecondary>
                )}
                <FhirResource
                  fhirResource={resource}
                  fhirVersion={fhirVersion}
                />
              </div>
            );
          })}
      </Body>
    </Root>
  );
};

export default Bundle;
