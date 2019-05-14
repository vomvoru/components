#!/usr/bin/env node
const path = require('path');

/**
 * config 속성을 검사한다.
 * @param {object} config
 */
const checkConfig = config => {
  if (config.template === undefined || Object.keys(config.template).length === 0) {
    throw new Error('설정파일에서 template 값을 설정해주세요.');
  }

  if (config.commonTemplate === undefined) {
    throw new Error('설정파일에서 commonTemplate 값을 설정해주세요.');
  }

  if (config.packages === undefined) {
    throw new Error('설정파일에서 packages 값을 설정해주세요.');
  }
};

/**
 * 설정파일(js)의 경로를 받으면 그 경로의 js파일의 값을 검사후
 * 결과값을 돌려준다.
 * @param {string} configPath
 */
const getConfig = configPath => {
  if (configPath === undefined || configPath === '') {
    throw new Error('config (-c, --configPath <configPath>) 값을 입력해주세요.');
  }

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const config = require(path.resolve(process.cwd(), configPath));

  checkConfig(config);

  return {
    template: config.template,
    commonTemplate: config.commonTemplate,
    packages: config.packages,
  };
};

module.exports = getConfig;
