require('dotenv').config();

const guard = require('./src/guard')
const plugins = require('./src/plugins');

(async () => {
  try {
    // await plugins.execute('localization', guard.EVERY_ONE_HOUR);
    // await plugins.execute('openWeather', guard.FORCE); // EVERY_ONE_HOUR
    // await plugins.execute('github', guard.EVERY_ONE_HOUR);
    await plugins.execute('wikipediaDayPerDay', guard.FORCE); // ON START OF DAY
  } catch (e) {
    console.error(e);
    process.exit(-1);
  }
})();
