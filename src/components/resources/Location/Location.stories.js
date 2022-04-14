import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import Location from './Location';

import dstu2Example1 from '../../../fixtures/dstu2/resources/location/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/location/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/location/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/location/example2.json';
import fhirIcons from '../../../fixtures/example-icons';
import LocationIcon from '../../../assets/containers/Location/location.svg';

export default {
  title: 'Location',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return (
    <Location
      fhirResource={fhirResource}
      fhirIcons={require('../../../assets/containers/Location/location.svg')}
    />
  );
};

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return <Location fhirResource={fhirResource} fhirIcons={LocationIcon} />;
};

export const Example1OfR4 = () => {
  const fhirResource = object('Resource', r4Example1);
  return <Location fhirResource={fhirResource} fhirIcons={fhirIcons} />;
};

export const Example2OfR4 = () => {
  const fhirResource = object('Resource', r4Example2);
  return <Location fhirResource={fhirResource} fhirIcons={false} />;
};
