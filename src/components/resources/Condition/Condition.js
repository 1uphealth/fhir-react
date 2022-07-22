import { Badge, Body, Header, Root } from '../../ui';

import Accordion from '../../containers/Accordion';
import CodeableConcept from '../../datatypes/CodeableConcept';
import DatePeriod from '../../datatypes/DatePeriod/DatePeriod';
import PropTypes from 'prop-types';
import React from 'react';
import Reference from '../../datatypes/Reference';
import _get from 'lodash/get';
import _has from 'lodash/has';
import fhirVersions from '../fhirResourceVersions';
import { getResourceDate } from '../../../utils/getResourceDate';

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

const Condition = ({
  fhirResource,
  fhirVersion,
  fhirIcons,
  onClick,
  rawOnClick,
  customId,
}) => {
  const {
    codeText,
    severityText,
    hasAsserter,
    asserter,
    hasBodySite,
    bodySite,
    clinicalStatus,
    dateRecorded,
  } = resourceDTO(fhirVersion, fhirResource);

  const tableData = [
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

  const conditionStartDatesPaths = [
    'meta.lastUpdated',
    'onsetPeriod.start',
    'onsetDateTime',
    'recordedDate',
    'dateRecorded',
    'assertedDate',
  ];

  const conditionEndDatesPaths = [
    'meta.lastUpdated',
    'abatementPeriod.end',
    'abatementDateTime',
  ];

  const headerStartDate = getResourceDate(
    fhirResource,
    conditionStartDatesPaths,
  );
  const headerEndDate =
    getResourceDate(fhirResource, conditionEndDatesPaths) || dateRecorded;

  return (
    <Root name="condition">
      <Accordion
        headerContent={
          <Header
            resourceName="Condition"
            additionalContent={
              <DatePeriod
                periodBeginLabel="Onset Date"
                periodBeginDate={headerStartDate}
                periodBeginTestId="onsetDate"
                periodEndLabel="Date recorded"
                periodEndDate={headerEndDate}
                periodEndTestId="dateRecorded"
              />
            }
            badges={
              <>
                {clinicalStatus && (
                  <Badge
                    bootstrapAlertType="alert-success"
                    data-testid="clinicalStatus"
                  >
                    {clinicalStatus}
                  </Badge>
                )}
              </>
            }
            icon={fhirIcons}
            title={codeText}
            rightAdditionalContent={
              severityText && (
                <>
                  <div className="ps-2" />
                  <Badge data-testid="severity">{severityText} severity</Badge>
                </>
              )
            }
          />
        }
        bodyContent={<Body tableData={tableData} />}
        onClick={onClick}
        rawOnClick={rawOnClick}
        customId={customId}
      />
    </Root>
  );
};

Condition.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

export default Condition;
