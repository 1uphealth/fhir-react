import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import ResearchStudy from './ResearchStudy';
import fhirVersions from '../fhirResourceVersions';

import stu3Example1 from '../../../fixtures/stu3/resources/researchStudy/example-1.json';
import r4Example1 from '../../../fixtures/r4/resources/researchStudy/example1.json';
import fhirIcons from '../../../fixtures/example-icons';

export default {
  title: 'ResearchStudy',
};

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <ResearchStudy
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const ExampleOfR4 = () => {
  const fhirResource = object('Resource', r4Example1);
  return (
    <ResearchStudy fhirVersion={fhirVersions.R4} fhirResource={fhirResource} />
  );
};
