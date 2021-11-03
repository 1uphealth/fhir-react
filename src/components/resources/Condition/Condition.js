import { Badge, Body, Header, Root, Title } from '../../ui';

import Accordion from '../../containers/Accordion';
import CodeableConcept from '../../datatypes/CodeableConcept';
import Date from '../../datatypes/Date';
import HeaderIcon from '../../datatypes/HeaderIcon';
import PropTypes from 'prop-types';
import React from 'react';
import Reference from '../../datatypes/Reference';
import _get from 'lodash/get';
import _has from 'lodash/has';
import fhirVersions from '../fhirResourceVersions';

const commonDTO = fhirResource => {
  const codeText =
    _get(fhirResource, 'code.coding.0.display') ||
    _get(fhirResource, 'code.text') ||
    _get(fhirResource, 'code.coding.0.code');
  const severityText =
    _get(fhirResource, 'severity.coding.0.display') ||
    _get(fhirResource, 'severity.text');
  const onsetDateTime = _get(fhirResource, 'onsetDateTime');
  const hasAsserter = _has(fhirResource, 'asserter');
  const asserter = _get(fhirResource, 'asserter');
  const hasBodySite = _get(fhirResource, 'bodySite.0.coding.0.display');
  const bodySite = _get(fhirResource, 'bodySite');

  return {
    codeText,
    severityText,
    onsetDateTime,
    hasAsserter,
    asserter,
    hasBodySite,
    bodySite,
  };
};
const dstu2DTO = fhirResource => {
  const clinicalStatus = _get(fhirResource, 'clinicalStatus');
  const dateRecorded = _get(fhirResource, 'dateRecorded');
  return {
    clinicalStatus,
    dateRecorded,
  };
};

const stu3DTO = fhirResource => {
  const clinicalStatus = _get(fhirResource, 'clinicalStatus');
  const dateRecorded = _get(fhirResource, 'assertedDate');
  return {
    clinicalStatus,
    dateRecorded,
  };
};

const r4DTO = fhirResource => {
  const clinicalStatus = _get(fhirResource, 'clinicalStatus.coding.0.code');
  const dateRecorded = _get(fhirResource, 'recordedDate');
  return {
    clinicalStatus,
    dateRecorded,
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
function Condition(props) {
  const { fhirResource, fhirVersion, fhirIcons } = props;

  const {
    codeText,
    severityText,
    onsetDateTime,
    hasAsserter,
    asserter,
    hasBodySite,
    bodySite,
    clinicalStatus,
    dateRecorded,
  } = resourceDTO(fhirVersion, fhirResource);

  const headerIcon = fhirIcons[_get(fhirResource, 'resourceType')];
  const tableData = [
    {
      label: 'Onset Date',
      testId: 'onsetDate',
      data: onsetDateTime && <Date fhirData={onsetDateTime} />,
      status: onsetDateTime,
    },
    {
      label: 'Date recorded',
      testId: 'dateRecorded',
      data: dateRecorded && <Date fhirData={dateRecorded} />,
      status: dateRecorded,
    },
    {
      label: 'Asserted by',
      testId: 'asserter',
      data: asserter && <Reference fhirData={asserter} />,
      status: hasAsserter,
    },
    {
      label: 'Anatomical locations',
      testId: 'bodySite',
      data: bodySite && <CodeableConcept fhirData={bodySite} />,
      status: hasBodySite,
    },
  ];

  return (
    <Root name="condition">
      <Accordion
        headerContent={
          <Header
            resourceName="Condition"
            icon={<HeaderIcon headerIcon={headerIcon} />}
            badge={
              clinicalStatus && (
                <Badge data-testid="clinicalStatus">{clinicalStatus}</Badge>
              )
            }
            titleSegment={
              <>
                <Title>{codeText || ''}</Title>
                {severityText && (
                  <div data-testid="severity">{severityText} severity</div>
                )}
              </>
            }
          />
        }
        bodyContent={<Body tableData={tableData} />}
      />
    </Root>
  );
}

Condition.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

export default Condition;
