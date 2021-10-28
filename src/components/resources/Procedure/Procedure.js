import {
  Badge,
  Body,
  Header,
  MissingValue,
  Root,
  Title,
  Value,
} from '../../ui';

import Accordion from '../../containers/Accordion/Accordion';
import Annotation from '../../datatypes/Annotation';
import CodeableConcept from '../../datatypes/CodeableConcept';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import HeaderIcon from '../../datatypes/HeaderIcon';
import PropTypes from 'prop-types';
import React from 'react';
import Reference from '../../datatypes/Reference';
import _get from 'lodash/get';
import _has from 'lodash/has';
import { isNotEmptyArray } from '../../../utils';

const Procedure = props => {
  const { fhirResource } = props;
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

  return (
    <Root name="Procedure">
      <Accordion
        headerData={
          <Header>
            <div className="d-flex align-items-center justify-content-between ">
              <div className="fhir-resource__Procedure__header__title-segment container">
                <div className="fhir-resource__Procedure__header__title-segment__row row row-cols-2">
                  <div className="fhir-resource__Procedure__header__title-segment__icon-column col-auto p-0">
                    <div className={`${display ? 'pt-1 px-1' : ''}`}>
                      <HeaderIcon />
                    </div>
                  </div>
                  <div className="fhir-resource__Procedure__header__title-segment__title-column col-auto">
                    {display && <Title>{display}</Title>}
                    {hasPerformedDateTime && (
                      <Date fhirData={performedDateTime} />
                    )}
                    {hasPerformedPeriod && (
                      <div>
                        {'performed   '}
                        {performedPeriodStart ? (
                          <Date fhirData={performedPeriodStart} />
                        ) : (
                          <MissingValue />
                        )}
                        {'   to   '}
                        {performedPeriodEnd ? (
                          <Date fhirData={performedPeriodEnd} />
                        ) : (
                          <MissingValue />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="fhir-resource__Procedure__header-right d-flex align-items-center pe-3 pt-1">
              {status && <Badge data-testid="status">{status}</Badge>}
            </div>
          </Header>
        }
        bodyData={
          <Body>
            {hasCoding && (
              <Value label="Identification" data-testid="hasCoding">
                {coding.map((coding, i) => (
                  <Coding key={`item-${i}`} fhirData={coding} />
                ))}
              </Value>
            )}
            {category && (
              <Value label="Category" data-testid="category">
                <Coding fhirData={category} />
              </Value>
            )}
            {hasPerformerData && (
              <Value label="Performed by">
                {performer.map((item, i) => (
                  <div key={`item-${i}`}>
                    {_get(item, 'actor.display', <MissingValue />)}
                  </div>
                ))}
              </Value>
            )}
            {hasReasonCode && (
              <Value
                label="Reason procedure performed"
                data-testid="hasReasonCode"
              >
                <Annotation fhirData={reasonCode} />
              </Value>
            )}
            {locationReference && (
              <Value label="Location" data-testid="location">
                <Reference fhirData={locationReference} />
              </Value>
            )}
            {hasNote && (
              <Value
                label="Additional information about the procedure"
                data-testid="hasNote"
              >
                <Annotation fhirData={note} />
              </Value>
            )}
            {isNotEmptyArray(outcome) && (
              <Value label="The result of procedure">
                <CodeableConcept fhirData={outcome} />
              </Value>
            )}
          </Body>
        }
      />
    </Root>
  );
};

Procedure.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Procedure;
