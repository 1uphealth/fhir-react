import _get from 'lodash/get';
import badgeColors from '../constants/badge-status.jsx';

export const getBadgeColor = props => {
  return badgeColors[_get(props, 'children')] || 'bg-gray-200 text-blue-900';
};
