import React from 'react';
import { object } from '@storybook/addon-knobs';

import RelatedPerson from './RelatedPerson';

import exampleRelatedPerson from '../../../fixtures/dstu2/resources/RelatedPerson/example.json';
import example2RelatedPersonDSTU2 from '../../../fixtures/dstu2/resources/RelatedPerson/example2.json';

import exampleRelatedPersonSTU3 from '../../../fixtures/stu3/resources/RelatedPerson/example.json';
import example2RelatedPersonSTU3 from '../../../fixtures/stu3/resources/RelatedPerson/example2.json';

import example1RelatedPersonR4 from '../../../fixtures/r4/resources/RelatedPerson/example1.json';
import example2RelatedPersonR4 from '../../../fixtures/r4/resources/RelatedPerson/example2.json';
import example3RelatedPersonR4 from '../../../fixtures/r4/resources/RelatedPerson/example3.json';
import RelatedPersonIcon from '../../../assets/containers/RelatedPerson/related-person.svg';
import fhirIcons from '../../../fixtures/example-icons';

export default { title: 'RelatedPerson' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', exampleRelatedPerson);
  return (
    <Patient
      fhirResource={fhirResource}
      fhirIcons={require('../../../assets/containers/RelatedPerson/related-person.svg')}
    />
  );
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', example2RelatedPersonDSTU2);
  return (
    <RelatedPerson fhirResource={fhirResource} fhirIcons={RelatedPersonIcon} />
  );
};

export const ExampleSTU3 = () => {
  const fhirResource = object('Resource', exampleRelatedPersonSTU3);
  return <RelatedPerson fhirResource={fhirResource} fhirIcons={fhirIcons} />;
};

export const Example2STU3 = () => {
  const fhirResource = object('Resource', example2RelatedPersonSTU3);
  return <RelatedPerson fhirResource={fhirResource} fhirIcons={false} />;
};

export const Example1R4 = () => {
  const fhirResource = object('Resource', example1RelatedPersonR4);
  return (
    <RelatedPerson fhirResource={fhirResource} fhirIcons={'random text'} />
  );
};

export const Example2R4 = () => {
  const fhirResource = object('Resource', example2RelatedPersonR4);
  return <RelatedPerson fhirResource={fhirResource} />;
};

export const Example3R4 = () => {
  const fhirResource = object('Resource', example3RelatedPersonR4);
  return <RelatedPerson fhirResource={fhirResource} />;
};
