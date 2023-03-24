const REQUIRED_FIELDS_ALARM = [
  'timestamp',
  'ConditionID',
  'Event',
  'Condition_name',
  'Input_channel',
  'Condition_type',
  'Threshold',
  'Value',
];

const REQUIRED_FIELDS_MEASUREMENT = [
  'timestamp',
  'FO1',
  'FO2',
  'FO3',
  'FO4',
  'TopOil',
  'Load_A',
  'Load_B',
  'Load_C',
];

module.exports = {
  REQUIRED_FIELDS_ALARM,
  REQUIRED_FIELDS_MEASUREMENT,
};
