const moment = require('moment');
const axios = require('axios').default;

const config = require('./config');
const eventModel = require('./../../models/event');

async function getUserEvents() {
  const response = await axios.get(`https://api.github.com/users/${config.username}/events?per_page=100`,{
      headers: {
          Accept: 'application/vnd.github.v3+json'
      },
      auth: {
          username: config.username,
          password: config.accessToken
      }
  });

  return response.data;
}

module.exports = async () => {
  const events = await getUserEvents();

  const models = events.map(i => {
    const key = `github-${i.type.toLowerCase()}`;
    
    return eventModel({
      hash: `${key}-${i.id}`,
      date: moment(i.created_at),
      key: key,
      value: 'VALUE'
    });
  });

  console.log('models', models)
}
