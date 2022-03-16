import fhirVersions from '../fhirResourceVersions';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import Group from './Group';

const Items = ({ fhirVersion, data }) => {
  if (fhirVersion === fhirVersions.DSTU2) {
    const prepareItems = item => {
      return {
        ...item,
        isGroup: !!_get(item, 'group'),
      };
    };

    if (data.isGroup) {
      return <Group data={data.data} prepareItems={prepareItems} />;
    }
    return (
      <Group data={[{ question: data.data }]} prepareItems={prepareItems} />
    );
  }

  if (fhirVersion === fhirVersions.STU3 || fhirVersion === fhirVersions.R4) {
    const prepareItems = item => ({
      ...item,
      group: !!_get(item, 'item') ? _get(item, 'item') : null,
      isGroup: !!_get(item, 'item'),
    });
    return <Group data={[{ question: data }]} prepareItems={prepareItems} />;
  }

  return null;
};

Items.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

export default Items;
