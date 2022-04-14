import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import Immunization from './Immunization';

import fhirVersions from '../fhirResourceVersions';
import example1 from '../../../fixtures/dstu2/resources/immunization/example1.json';
import example2 from '../../../fixtures/dstu2/resources/immunization/example2.json';
import stu3Example from '../../../fixtures/stu3/resources/immunization/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/immunization/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/immunization/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/immunization/example3.json';
import fhirIcons from '../../../fixtures/example-icons';
import ImmunizationIcon from '../../../assets/containers/Immunization/immunization.svg';

export default {
  title: 'Immunization',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', example1);
  return (
    <Immunization
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.DSTU2}
      fhirIcons={require('../../../assets/containers/Immunization/immunization.svg')}
    />
  );
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', example2);
  return (
    <Immunization
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.DSTU2}
      fhirIcons={ImmunizationIcon}
    />
  );
};

export const ExampleSTU3 = () => {
  const fhirResource = object('Resource', stu3Example);
  return (
    <Immunization
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.STU3}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example1R4 = () => {
  const fhirResource = object('Resource', r4Example1);
  return (
    <Immunization
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.R4}
      fhirIcons={false}
    />
  );
};
export const Example2R4 = () => {
  const fhirResource = object('Resource', r4Example2);
  return (
    <Immunization
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.R4}
      fhirIcons={'random text'}
    />
  );
};
export const Example3R4 = () => {
  const fhirResource = object('Resource', r4Example3);
  return (
    <Immunization fhirResource={fhirResource} fhirVersion={fhirVersions.R4} />
  );
};
