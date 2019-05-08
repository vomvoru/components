const path = require('path');
const createScripts = require('../utils/createScripts');

module.exports = createScripts({
  test: {
    configPath: path.resolve(__dirname, 'jest.config.js'),
  },
});
