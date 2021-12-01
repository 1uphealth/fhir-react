import { Badge, Body, Header, MissingValue, Root } from '../../ui';

import Accordion from '../../containers/Accordion/Accordion';
import Annotation from '../../datatypes/Annotation';
import CodeableConcept from '../../datatypes/CodeableConcept';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import DatePeriod from '../../datatypes/DatePeriod/DatePeriod';
import PropTypes from 'prop-types';
import React from 'react';
import Reference from '../../datatypes/Reference';
import _get from 'lodash/get';
import _has from 'lodash/has';
import { isNotEmptyArray } from '../../../utils';

const Procedure = props => {
  const { fhirResource, fhirIcons } = props;
  const display =
    _get(fhirResource, 'code.coding[0].display') ||
    _get(fhirResource, 'code.text');
  const status = _get(fhirResource, 'status', '');
  const hasPerformedDateTime = _has(fhirResource, 'performedDateTime');
  const performedDateTime = _get(fhirResource, 'performedDateTime');
  const performedPeriodStart = _get(fhirResource, 'performedPeriod.start');
  const performedPeriodEnd = _get(fhirResource, 'performedPeriod.end');
  const hasPerformedPeriod = performedPeriodStart || performedPeriodEnd;
  const hasCoding = _has(fhirResource, 'code.coding');
  const coding = _get(fhirResource, 'code.coding', []);
  const category = _get(fhirResource, 'category.coding[0]');
  const locationReference = _get(fhirResource, 'location');
  const hasPerformerData = _has(fhirResource, 'performer.0.actor.display');
  const performer = _get(fhirResource, 'performer', []);
  const hasReasonCode = _has(fhirResource, 'reasonCode');
  const reasonCode = _get(fhirResource, 'reasonCode', []);
  const hasNote = _has(fhirResource, 'note');
  const note = _get(fhirResource, 'note', []);
  const outcome = _get(fhirResource, 'outcome');

  const headerIcon = fhirIcons[_get(fhirResource, 'resourceType')];
  const tableData = [
    {
      label: 'Identification',
      testId: 'hasCoding',
      data: coding && (
        <>
          {coding.map((coding, i) => (
            <Coding key={`item-${i}`} fhirData={coding} />
          ))}
        </>
      ),
      status: hasCoding,
    },
    {
      label: 'Category',
      testId: 'category',
      data: category && <Coding fhirData={category} />,
      status: category,
    },
    {
      label: 'Performed by',
      testId: 'dateRecorded',
      data: performer && (
        <>
          {performer.map((item, i) => (
            <div key={`item-${i}`}>
              {_get(item, 'actor.display', <MissingValue />)}
            </div>
          ))}
        </>
      ),
      status: hasPerformerData,
    },
    {
      label: 'Reason procedure performed',
      testId: 'hasReasonCode',
      data: reasonCode && <Annotation fhirData={reasonCode} />,
      status: hasReasonCode,
    },
    {
      label: 'Location',
      testId: 'location',
      data: locationReference && <Reference fhirData={locationReference} />,
      status: locationReference,
    },
    {
      label: 'Additional information about the procedure',
      testId: 'hasNote',
      data: note && <Annotation fhirData={note} />,
      status: hasNote,
    },
    {
      label: 'The result of procedure',
      testId: '',
      data: outcome && <CodeableConcept fhirData={outcome} />,
      status: isNotEmptyArray(outcome),
    },
  ];

  return (
    <Root name="Procedure">
      <Accordion
        headerContent={
          <Header
            resourceName="Procedure"
            additionalContent={
              <>
                {hasPerformedDateTime && <Date fhirData={performedDateTime} />}
                {hasPerformedPeriod && (
                  <DatePeriod
                    periodBeginLabel="performed"
                    periodBeginDate={performedPeriodStart}
                    periodEndLabel="to"
                    periodEndDate={performedPeriodEnd}
                  />
                )}
              </>
            }
            badges={status && <Badge data-testid="status">{status}</Badge>}
            icon={headerIcon}
            title={display}
          />
        }
        bodyContent={<Body tableData={tableData} />}
      />
    </Root>
  );
};

Procedure.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Procedure;
