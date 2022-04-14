import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import Practitioner from './Practitioner';
import fhirVersions from '../fhirResourceVersions';
import dstu2Example1 from '../../../fixtures/dstu2/resources/practitioner/example-1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/practitioner/example-2.json';

import stu3Example1 from '../../../fixtures/stu3/resources/practitioner/example-1.json';

import r4Example1 from '../../../fixtures/r4/resources/practitioner/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/practitioner/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/practitioner/example3.json';
import PractitionerIcon from '../../../assets/containers/Practitioner/practitioner.svg';
import fhirIcons from '../../../fixtures/example-icons';

export default { title: 'Practitioner' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return (
    <Practitioner
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
      fhirIcons={require('../../../assets/containers/Practitioner/practitioner.svg')}
    />
  );
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example2);
  return (
    <Practitioner
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
      fhirIcons={PractitionerIcon}
    />
  );
};

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <Practitioner
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example1OfR4 = () => {
  const fhirResource = object('Resource', r4Example1);
  return (
    <Practitioner
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={false}
    />
  );
};

export const Example2OfR4 = () => {
  const fhirResource = object('Resource', r4Example2);
  return (
    <Practitioner
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={'random text'}
    />
  );
};

export const Example3OfR4 = () => {
  const fhirResource = object('Resource', r4Example3);
  return (
    <Practitioner fhirVersion={fhirVersions.R4} fhirResource={fhirResource} />
  );
};
