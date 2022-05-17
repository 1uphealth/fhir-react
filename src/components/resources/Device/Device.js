import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _has from 'lodash/has';

import Coding from '../../datatypes/Coding';
import CodeableConcept, { hasValue } from '../../datatypes/CodeableConcept';
import Date from '../../datatypes/Date';
import fhirVersions from '../fhirResourceVersions';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import {
  Root,
  Header,
  Badge,
  Body,
  MissingValue,
  ValueSectionItem,
} from '../../ui';
import Accordion from '../../containers/Accordion';

const commonDTO = fhirResource => {
  const model = _get(fhirResource, 'model', 'Device');
  const status = _get(fhirResource, 'status', '');
  const getTypeCoding = _get(fhirResource, 'type.coding');
  const hasTypeCoding = Array.isArray(getTypeCoding);

  return {
    model,
    status,
    getTypeCoding,
    hasTypeCoding,
  };
};

const dstu2DTO = fhirResource => {
  const getUdi = _get(fhirResource, 'udi');
  const hasExpiry = _has(fhirResource, 'expiry');
  const getExpiry = _get(fhirResource, 'expiry');
  return {
    getUdi,
    hasExpiry,
    getExpiry,
  };
};

const stu3DTO = fhirResource => {
  const getUdi = _get(fhirResource, 'udi.name');
  const hasExpiry = _has(fhirResource, 'expirationDate');
  const getExpiry = _get(fhirResource, 'expirationDate');
  const safety = _get(fhirResource, 'safety', []);
  const hasSafety = hasValue(safety);
  return {
    getUdi,
    hasExpiry,
    getExpiry,
    safety,
    hasSafety,
  };
};

const r4DTO = fhirResource => {
  const getUdi = _get(fhirResource, 'udiCarrier.deviceIdentifier');
  const hasExpiry = _has(fhirResource, 'expirationDate');
  const getExpiry = _get(fhirResource, 'expirationDate');
  const udiCarrierAIDC = _get(fhirResource, 'udiCarrier.carrierAIDC');
  const udiCarrierHRF = _get(fhirResource, 'udiCarrier.carrierHRF');
  const safety = _get(fhirResource, 'safety', []);
  const hasSafety = hasValue(safety);
  return {
    getUdi,
    hasExpiry,
    getExpiry,
    udiCarrierAIDC,
    udiCarrierHRF,
    safety,
    hasSafety,
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
    case fhirVersions.R4: {
      return {
        ...commonDTO(fhirResource),
        ...r4DTO(fhirResource),
      };
    }

    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const Device = ({
  fhirResource,
  fhirVersion,
  fhirIcons,
  onClick,
  rawOnClick,
  customId,
}) => {
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="Device" />;
  }

  const {
    model,
    status,
    hasExpiry,
    getExpiry,
    getTypeCoding,
    hasTypeCoding,
    getUdi,
    udiCarrierAIDC,
    udiCarrierHRF,
    safety,
    hasSafety,
  } = fhirResourceData;

  const safetyArr = hasSafety && !Array.isArray(safety) ? [safety] : safety;
  return (
    <Root name="Device">
      <Accordion
        headerContent={
          <Header
            icon={fhirIcons}
            resourceName="Device"
            badges={status && <Badge data-testid="status">{status}</Badge>}
            title={model}
            additionalContent={
              hasExpiry && (
                <div data-testid="expiry">
                  <span className="text-secondary">expires on</span>{' '}
                  <Date fhirData={getExpiry} isBlack />
                </div>
              )
            }
          />
        }
        bodyContent={
          <Body>
            {hasTypeCoding && (
              <ValueSectionItem data-testid="typeCoding" label="Type">
                {getTypeCoding.map((coding, i) => (
                  <Coding key={`item-${i}`} fhirData={coding} />
                ))}
              </ValueSectionItem>
            )}
            <ValueSectionItem
              label="Unique device identifier"
              data-testid="uniqueId"
            >
              {getUdi ? getUdi : <MissingValue />}
            </ValueSectionItem>
            {udiCarrierAIDC && (
              <ValueSectionItem label="AIDC barcode">
                {udiCarrierAIDC}
              </ValueSectionItem>
            )}
            {udiCarrierHRF && (
              <ValueSectionItem label="HRF barcode">
                {udiCarrierHRF}
              </ValueSectionItem>
            )}
            {hasSafety &&
              safetyArr.map((item, i) => (
                <ValueSectionItem label="HRF barcode" key={`safety-${i}`}>
                  <CodeableConcept fhirData={item} />
                </ValueSectionItem>
              ))}
          </Body>
        }
        onClick={onClick}
        rawOnClick={rawOnClick}
        customId={customId}
      />
    </Root>
  );
};

Device.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

export default Device;
