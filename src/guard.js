const ON_START_OF_DAY = 'start'; // 00:01
const ON_END_OF_DAY = 'end'; // 23:59

const EVERY_ONE_HOUR = '1H';
const EVERY_FOUR_HOURS = '4H'; // HH:00 % 4 == 0

const FORCE = '997';

function shouldRun(type, period) {
  const currentDate = new Date();

  if (period === ON_START_OF_DAY) {
    console.error(`not implemented on start of day`);
  } else if (period == ON_END_OF_DAY) {
    console.error(`not implemented on end of day`);
  } else if (period === EVERY_ONE_HOUR) {
    console.error(`not implemented at every hour`);
  } else if (period === EVERY_FOUR_HOURS) {
    if (currentDate.getHours() === 0 || currentDate.getHours() % 4 === 0) {
      console.log(`Executing ${type}...`);
      return true;
    }
  } else if (period === FORCE) {
    return true;
  } else {
    console.error(`Not defined valid period: ${period}`);
  }

  console.log(`Omit execution: ${type}`);

  return false;
}

function storeLastRun(type) {
  const currentTimestamp = 1234;
}

module.exports = {
  shouldRun,
  storeLastRun,
  ON_START_OF_DAY,
  ON_END_OF_DAY,
  EVERY_ONE_HOUR,
  EVERY_FOUR_HOURS,
  FORCE
}
