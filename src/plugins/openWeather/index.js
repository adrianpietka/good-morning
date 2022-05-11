const moment = require('moment');
const axios = require('axios').default;

const config = require('./config');
const eventModel = require('./../../models/event');
const localization = require('../../localization');

async function getCurrentWeather() {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`
    + `?lat=${localization.lat}`
    + `&lon=${localization.lon}`
    + `&lang=${config.language}`
    + `&appid=${config.appId}`
    + `&units=${config.units}`);

  return response.data;
}

async function getCurrentAirPollution() {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution`
    + `?lat=${localization.lat}`
    + `&lon=${localization.lon}`
    + `&lang=${config.language}`
    + `&appid=${config.appId}`
    + `&units=${config.units}`);

  return response.data;
}

module.exports = async () => {
  try {
    const weather = await getCurrentWeather();
    const airPollution = await getCurrentAirPollution();

    const air = airPollution.list[0];
    const hashSufixPerHour = moment().format('YYYY-MM-DD-HH');

    const sunrise = eventModel({ key: 'sunrise', value: weather.sys.sunrise, type: 'number', hash: 'sunrise-' + hashSufixPerHour });
    const sunset = eventModel({ key: 'sunset', value: weather.sys.sunset, type: 'number', hash: 'sunset-' + hashSufixPerHour });
    const localisationName = eventModel({ key: 'localisation-name', value: weather.name, hash: 'localisation-' + hashSufixPerHour });

    const temp = eventModel({ key: 'weather-temp', value: weather.main.temp, type: 'number', hash: 'weather-temp-' + hashSufixPerHour });
    const pressure = eventModel({ key: 'weather-pressure', value: weather.main.pressure, type: 'number', hash: 'weather-pressure-' + hashSufixPerHour });
    const humidity = eventModel({ key: 'weather-humidity', value: weather.main.humidity, type: 'number', hash: 'weather-humidity-' + hashSufixPerHour });

    const airAqi = eventModel({ key: 'air-aqi', value: air.main.aqi, type: 'number', hash: 'air-aqi-' + hashSufixPerHour });
    const airPm25 = eventModel({ key: 'air-pm25', value: air.components.pm2_5, type: 'number', hash: 'air-pm25-' + hashSufixPerHour });
    const airPm10 = eventModel({ key: 'air-pm10', value: air.components.pm10, type: 'number', hash: 'air-pm10-' + hashSufixPerHour });

    return [
      sunrise, sunset, localisationName,
      temp, pressure, humidity,
      airAqi, airPm25, airPm10
    ];

  } catch (e) {
    console.error('OpenWeather error: ', e);
    throw new Error(`Can't get data from OpenWeather: ${e.message}`);
  }
}
