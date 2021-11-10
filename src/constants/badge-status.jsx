const getColors = color => {
  return `bg-${color}-100 text-${color}-600`;
};

export default {
  // condition
  active: getColors('teal'),
  recurrence: '',
  relapse: getColors('indigo'),
  inactive: `${getColors('gray')} border border-1 rounded-1 border-gray-200`,
  remission: getColors('cyan'),
  resolved: getColors('blue'),
  // immunization
  'in-progress': getColors('orange'),
  'on-hold': 'bg-gray-100 text-pink-500',
  completed: getColors('teal'),
  'entered-in-error': getColors('red'),
  stopped: getColors('gray'),
  'not-done': getColors('yellow'),
  // procedure
  preparation: 'border border-1 rounded-1 border-blue-200 text-blue-600',
  suspended: '',
  aborted: '',
  unknown: 'border border-1 rounded-1 border-gray-200 text-gray-600',
  // practitioner
  // allergy intolerance
  unconfirmed: '',
  confirmed: '',
  refuted: '',
  // appointment
  proposed: '',
  pending: '',
  booked: '',
  arrived: '',
  fulfilled: '',
  cancelled: '',
  noshow: '',
  'checked-in': '',
  waitlist: '',
  // care plan
  draft: '',
  revoked: '',
  // care team
  // claim
  // claim response
  // device
  available: '',
  'not-available': '',
  // diagnostic report
  registered: '',
  partial: '',
  preliminary: '',
  final: '',
  corrected: '',
  appended: '',
  // document reference
  current: '',
  superseded: '',
  // encounter
  planned: '',
  triaged: '',
  onleave: '',
  finished: '',
  // explanation of benefit
  // family member history
  'health-unknown': '',
  // goal
  accepted: '',
  rejected: '',
  achieved: '',
  sustaining: '',
  'on-target': '',
  'ahead-of-target': '',
  'behind-target': '',
  // list
  retired: '',
  // location
  // mediacation
  brand: '',
  // medication administration
  // medication knowledge
  // medication statement
  intended: '',
  'not-taken': '',
  // observation
  amended: '',
  // procedure
  // questionnaire
  published: '',
  // questionnaire response
  // research study
  'administratively-completed': '',
  approved: '',
  'closed-to-accrual': '',
  'closed-to-accrual-and-intervention': '',
  disapproved: '',
  'in-review': '',
  'temporarily-closed-to-accrual': '',
  'temporarily-closed-to-accrual-and-intervention': '',
  withdrawn: '',
};
