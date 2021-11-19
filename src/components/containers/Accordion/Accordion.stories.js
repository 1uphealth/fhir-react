import { BadgeSecondary, Body, MissingValue, Title, Value } from '../../ui';

import Accordion from './Accordion';
import Annotation from '../../datatypes/Annotation';
import Date from '../../datatypes/Date';
import Procedure from '../../resources/Procedure/Procedure';
import React from 'react';
import Reference from '../../datatypes/Reference';
import _get from 'lodash/get';
import example1 from '../../../fixtures/dstu2/resources/procedure/example1.json';
import fhirIcons from '../../../fixtures/example-icons';
import { object } from '@storybook/addon-knobs';
import stu3Example1 from '../../../fixtures/stu3/resources/procedure/example1.json';

export default {
  title: 'Accordion',
};

export const DefaultVisualization = () => {
  const fhirResource = object('Resource', stu3Example1);
  console.log(fhirResource);
  const title =
    _get(fhirResource, 'code.coding[0].display') ||
    _get(fhirResource, 'code.text');
  const performedDateTime = _get(fhirResource, 'performedDateTime');
  const performer = _get(fhirResource, 'performer', []);
  const locationReference = _get(fhirResource, 'location[0]');
  const reasonCode = _get(fhirResource, 'reasonCode', []);
  const note = _get(fhirResource, 'note', []);

  return (
    <Accordion
      headerContent={
        <div className="">
          <Title>{title}</Title>
          <div className="pb-3" />
          <BadgeSecondary data-testid="performedDateTime">
            <Date fhirData={performedDateTime} />
          </BadgeSecondary>
        </div>
      }
      bodyContent={
        <Body>
          <Value label="Performed by">
            {performer.map((item, i) => (
              <div key={`item-${i}`}>
                {_get(item, 'actor.display', <MissingValue />)}
              </div>
            ))}
          </Value>
          <Value label="Location" data-testid="location">
            <Reference fhirData={locationReference} />
          </Value>
          <Value label="Reason" data-testid="hasReasonCode">
            <Annotation fhirData={reasonCode} />
          </Value>
          <Value label="Notes" data-testid="hasNote">
            <Annotation fhirData={note} />
          </Value>
        </Body>
      }
    />
  );
};

export const ProcedureVisualization = () => {
  const fhirResource = object('Resource', example1);

  return (
    <Accordion
      headerContent={<div className=""></div>}
      bodyContent={
        <Procedure fhirResource={fhirResource} fhirIcons={fhirIcons} />
      }
    />
  );
};
