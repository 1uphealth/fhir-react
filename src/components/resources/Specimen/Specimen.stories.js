import React from 'react';
import Specimen from './Specimen';

export default {
  title: 'Resources/Specimen',
  component: Specimen,
};

const Template = args => <Specimen {...args} />;

export const Default = Template.bind({});
Default.args = {
  fhirResource: {
    resourceType: 'Specimen',
    id: 'example',
    type: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '119297000',
          display: 'Blood specimen',
        },
      ],
    },
    status: 'available',
    subject: {
      reference: 'Patient/example',
      display: 'John Doe',
    },
    collection: {
      collector: {
        reference: 'Practitioner/example',
        display: 'Dr. Smith',
      },
      collectedDateTime: '2023-01-01T10:00:00Z',
    },
    receivedTime: '2023-01-01T10:30:00Z',
    note: [
      {
        text: 'Sample collected for routine blood work',
      },
    ],
  },
};
