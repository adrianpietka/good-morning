const moment = require('moment');

function enforceData(data) {
  if (!data.hash) {
    throw new Error('Property "hash" doesn\'t exists!', data);
  }

  if (!data.key) {
    throw new Error('Property "key" doesn\'t exists!', data);
  }

  if (!data.value) {
    throw new Error('Property "value" doesn\'t exists!', data);
  }

  if (data.date && !moment.isMoment(data.date)) {
    throw new Error('Property "date" isn\'t moment object!', data);
  }
}

module.exports = (data) => {
  enforceData(data);

  const date = data.date || moment();

  return {
    hash: data.hash,

    timestamp: date.unix(),
    date: date.format('YYYY-MM-DD HH:mm'),

    // @TODO: add property dateTimeZone(?)

    dateYearWeek: `${date.year()}-${date.week()}`,
    dateYearMonth: date.format('YYYY-MM'),

    dateQuarterOfYear: date.quarter(),
    dateDayOfYear: date.dayOfYear(),
    dateWeekOfYear: date.week(),

    dateYear: date.year(),
    dateMonth: date.month() + 1,
    dateDay: date.date(),
    dateHour: date.hour(),
    dateMinute: date.minute(),

    key: data.key,
    type: data.type || 'string',
    value: data.value,
    description: data.description || ''
  };
};
