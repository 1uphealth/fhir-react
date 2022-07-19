import _get from 'lodash/get';

export const getResourceDate = (resource, paths) => {
  return paths?.reduce((acc, path) => {
    const dataTemp = _get(resource, path);
    if (dataTemp && !acc) acc = dataTemp;
    return acc;
  }, null);
};
