const guard = require('./../guard');
const github = require('./github');
const openWeather = require('./openWeather');
const wikipediaDayPerDay = require('./wikipediaDayPerDay');

const plugins = {
  github,
  openWeather,
  wikipediaDayPerDay
};

async function execute(name, period) {
  if (+parseInt(process.env[name.toUpperCase()]) && guard.shouldRun(name, period)) {
    const models = await plugins[name]();
    console.log('Recived models', models);
    guard.storeLastRun(name);
  }
}

module.exports = {
  execute
};
