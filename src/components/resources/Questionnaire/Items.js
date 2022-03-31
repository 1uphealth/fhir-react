import fhirVersions from '../fhirResourceVersions';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import Group from './Group';

const Items = ({ fhirVersion, data }) => {
  if (fhirVersion === fhirVersions.DSTU2) {
    const prepareItems = item => ({
      ...item,
      item: _get(item, 'question') || _get(item, 'group') || [],
      isGroup: !!_get(item, 'group'),
    });
    return <Group data={data} prepareItems={prepareItems} />;
  }

  if (fhirVersion === fhirVersions.STU3) {
    const prepareItems = item => ({
      ...item,
      isGroup: _get(item, 'type') === 'group',
    });
    return <Group data={data} prepareItems={prepareItems} />;
  }

  if (fhirVersion === fhirVersions.R4) {
    const prepareItems = item => ({
      ...item,
      isGroup: _get(item, 'type') === 'group',
    });
    return <Group data={data} prepareItems={prepareItems} />;
  }

  return null;
};

Items.propTypes = {
  data: PropTypes.array,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

export default Items;
