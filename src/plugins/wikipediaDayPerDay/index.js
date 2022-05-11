const moment = require('moment');
const axios = require('axios').default;
const { JSDOM } = require('jsdom');

const eventModel = require('../../models/event');

const months = {
  1: 'stycznia',
  2: 'lutego',
  3: 'marca',
  4: 'kwietnia',
  5: 'maja',
  6: 'czerwca',
  7: 'lipca',
  8: 'sierpnia',
  9: 'wrzesnia',
  10: 'pazdziernika',
  11: 'listopada',
  12: 'grudnia'
};

module.exports = async () => {
  const date = moment();
  const day = date.date();
  const month = months[date.month() + 1];
  const hashSufixPerDay = date.format('YYYY-MM-DD');

  const response = await axios.get(`https://pl.wikipedia.org/wiki/${day}_${month}`);
  
  const dom = new JSDOM(response.data);
  const events = Array.from(dom.window.document.querySelector('#Święta').parentElement.nextElementSibling.querySelectorAll('li'));
  const nameDay = events.filter(element => element.textContent.indexOf('Imieniny') !== -1)[0].textContent.replace('Imieniny obchodzą:', '').trim() || null;
  const internationalEvents = events.filter(element => element.textContent.indexOf('Międzynarodowe') !== -1)[0]?.textContent.replace('Międzynarodowe:', '').trim() || null;
  const polishEvents = events.filter(element => element.textContent.indexOf('Polska') !== -1)[0]?.textContent.replace('Polska –', '').replace('Polska:', '') || null;

  return [
    eventModel({ key: 'day-name-day', value: nameDay, date, hash: 'day-name-day-' + hashSufixPerDay }),
    internationalEvents ? eventModel({ key: 'day-international-events', value: internationalEvents, date, hash: 'day-international-events-' + hashSufixPerDay }) : null,
    polishEvents ? eventModel({ key: 'day-polish-events', value: polishEvents, date, hash: 'day-polish-events-' + hashSufixPerDay }) : null
  ].filter(i => i);
};
