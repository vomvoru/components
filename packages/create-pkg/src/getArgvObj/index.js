const checkParsedArgv = require('./checkParsedArgv');
const getConfig = require('./getConfig');
const parseProcessArgv = require('./parseProcessArgv');

const getArgvObj = () => {
  const parsedArgv = parseProcessArgv();
  const config = getConfig(parsedArgv.configPath);

  delete parsedArgv.configPath;

  checkParsedArgv(parsedArgv, config);

  return {
    ...parsedArgv,
    config,
  };
};

module.exports = getArgvObj;
