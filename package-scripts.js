const path = require('path');

const createScripts = require('./utils/createScripts');

const scripts = createScripts({
  jest: {
    configPath: path.resolve(__dirname, 'jest.config.js'),
  },
});

module.exports = { scripts };
