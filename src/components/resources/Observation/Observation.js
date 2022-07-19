import React from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import Accordion from '../../containers/Accordion';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import ObservationGraph from './ObservationGraph';
import {
  Root,
  Header,
  Badge,
  BadgeSecondary,
  ValueUnit,
  Body,
  Value,
} from '../../ui';
import Reference from '../../datatypes/Reference';
import { getResourceDate } from '../../../utils/getResourceDate';

const Observation = ({
  fhirResource,
  fhirIcons,
  onClick,
  rawOnClick,
  customId,
}) => {
  const effectiveDate = _get(fhirResource, 'effectiveDateTime');
  const codeCodingDisplay = _get(fhirResource, 'code.coding.0.display');
  const codeText = _get(fhirResource, 'code.text', '');
  const valueQuantityValue = _get(fhirResource, 'valueQuantity.value', '');
  // const issued = _get(fhirResource, 'issued', '');
  const valueQuantityUnit = _get(fhirResource, 'valueQuantity.unit', '');
  const status = _get(fhirResource, 'status', '');
  const valueCodeableConceptText = _get(
    fhirResource,
    'valueCodeableConcept.text',
  );
  const valueCodeableConceptCodingDisplay = _get(
    fhirResource,
    'valueCodeableConcept.coding[0].display',
  );
  const valueCodeableConceptCoding = _get(
    fhirResource,
    'valueCodeableConcept.coding',
    [],
  );

  let valueQuantityValueNumber = valueQuantityValue;

  const subject = _get(fhirResource, 'subject');
  const tableData = [
    {
      label: 'Issued on',
      testId: 'issuedOn',
      data: effectiveDate && <Date fhirData={effectiveDate} isBlack />,
      status: effectiveDate,
    },
    {
      label: 'Subject',
      testId: 'subject',
      data: subject && <Reference fhirData={subject} />,
      status: subject,
    },
    {
      label: 'Coding',
      testId: 'coding',
      data: valueCodeableConceptCoding.map((coding, i) => (
        <Coding fhirData={coding} key={`value-coding-${i}`} />
      )),
      status: !_isEmpty(valueCodeableConceptCoding),
    },
  ];

  const observationDatesPaths = [
    'effectiveDateTime',
    'effectivePeriod.start',
    'effectiveDateTime',
    'issued',
    'valuePeriod.start',
    'valueDateTime',
  ];

  const headerDate = getResourceDate(fhirResource, observationDatesPaths);

  return (
    <Root name="Observation">
      <Accordion
        headerContent={
          <Header
            resourceName="Observation"
            additionalContent={
              headerDate && (
                <Value label="Start date" data-testid="headerStartDate">
                  <Date fhirData={headerDate} isBlack />
                </Value>
              )
            }
            prefixBadge={
              <ValueUnit
                valueQty={valueQuantityValueNumber}
                valueUnit={valueQuantityUnit}
              />
            }
            additionalBadge={
              (valueCodeableConceptText ||
                valueCodeableConceptCodingDisplay) && (
                <BadgeSecondary data-testid="secondaryStatus">
                  {valueCodeableConceptText ||
                    valueCodeableConceptCodingDisplay}
                </BadgeSecondary>
              )
            }
            badges={status && <Badge data-testid="status">{status}</Badge>}
            title={codeCodingDisplay || codeText}
            rightAdditionalContent={
              <ObservationGraph
                valueQuantity={fhirResource.valueQuantity}
                referenceRange={fhirResource.referenceRange}
                small
              />
            }
            icon={fhirIcons}
          />
        }
        bodyContent={
          <Body tableData={tableData} reverseContent>
            <ObservationGraph
              valueQuantity={fhirResource.valueQuantity}
              referenceRange={fhirResource.referenceRange}
            />
          </Body>
        }
        onClick={onClick}
        rawOnClick={rawOnClick}
        customId={customId}
      />
    </Root>
  );
};

Observation.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Observation;
