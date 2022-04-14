import React from 'react';
import _get from 'lodash/get';

import { BadgeSecondary, Body, MissingValue, Title, Value } from '../../ui';

import Accordion from './Accordion';
import Annotation from '../../datatypes/Annotation';
import Date from '../../datatypes/Date';
import Reference from '../../datatypes/Reference';
import Procedure from '../../resources/Procedure/Procedure';

import example1 from '../../../fixtures/dstu2/resources/procedure/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/procedure/example1.json';
import fhirIcons from '../../../fixtures/example-icons';

// TODO: fix

export default {
  title: 'Accordion',
  component: Accordion,
  argTypes: {
    headerContent: {
      table: {
        disable: true,
      },
    },
    bodyContent: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = args => <Accordion {...args} />;
// TODO: fix header and body, so they look right (with <Header> and tableData)
const DefaultVisualizationFhirResource = stu3Example1;
export const DefaultVisualization = Template.bind({});
DefaultVisualization.args = {
  headerContent: (
    <div className="">
      <Title>
        {_get(DefaultVisualizationFhirResource, 'code.coding[0].display') ||
          _get(DefaultVisualizationFhirResource, 'code.text')}
      </Title>
      <div className="pb-3" />
      <BadgeSecondary data-testid="performedDateTime">
        <Date
          fhirData={_get(DefaultVisualizationFhirResource, 'performedDateTime')}
        />
      </BadgeSecondary>
    </div>
  ),
  bodyContent: (
    <Body>
      <Value label="Performed by">
        {_get(DefaultVisualizationFhirResource, 'performer', []).map(
          (item, i) => (
            <div key={`item-${i}`}>
              {_get(item, 'actor.display', <MissingValue />)}
            </div>
          ),
        )}
      </Value>
      <Value label="Location" data-testid="location">
        <Reference
          fhirData={_get(DefaultVisualizationFhirResource, 'location[0]')}
        />
      </Value>
      <Value label="Reason" data-testid="hasReasonCode">
        <Annotation
          fhirData={_get(DefaultVisualizationFhirResource, 'reasonCode', [])}
        />
      </Value>
      <Value label="Notes" data-testid="hasNote">
        <Annotation
          fhirData={_get(DefaultVisualizationFhirResource, 'note', [])}
        />
      </Value>
    </Body>
  ),
};

const ProcedureVisualizationFhirResource = example1;
export const ProcedureVisualization = Template.bind({});
ProcedureVisualization.args = {
  headerContent: <div className="" />,
  bodyContent: (
    <Procedure
      fhirResource={ProcedureVisualizationFhirResource}
      fhirIcons={fhirIcons}
    />
  ),
};
