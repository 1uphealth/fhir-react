import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import Goal from './Goal';
import fhirIcons from '../../../fixtures/example-icons';
import dstu2Example1 from '../../../fixtures/dstu2/resources/goal/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/goal/example2.json';
import stu3Example1 from '../../../fixtures/stu3/resources/goal/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/goal/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/goal/example2.json';
import fhirVersions from '../fhirResourceVersions';
import GoalIcon from '../../../assets/containers/Goal/goal.svg';

export default {
  title: 'Goal',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return (
    <Goal
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
      fhirIcons={require('../../../assets/containers/Goal/goal.svg')}
    />
  );
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example2);
  return (
    <Goal
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
      fhirIcons={GoalIcon}
    />
  );
};

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <Goal
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example1OfR4 = () => {
  const fhirResource = object('Resource', r4Example1);
  return (
    <Goal
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={false}
    />
  );
};

export const Example2OfR4 = () => {
  const fhirResource = object('Resource', r4Example2);
  return (
    <Goal
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={'random text'}
    />
  );
};

export const ExampleWithoutFhirVersionProperty = () => {
  const fhirResource = object('Resource', stu3Example1);
  return <Goal fhirResource={fhirResource} fhirIcons={fhirIcons} />;
};
