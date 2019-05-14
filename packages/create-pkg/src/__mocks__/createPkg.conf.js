const path = require('path');

const ROOT = path.resolve(__dirname, '.');
const TEMPLATE_PATH = path.resolve(ROOT, 'template');
const PACKAGES = path.resolve(ROOT, 'packages');

module.exports = {
  template: {
    js: path.resolve(TEMPLATE_PATH, 'js-util'),
    ts: path.resolve(TEMPLATE_PATH, 'ts-util'),
  },
  commonTemplate: path.resolve(TEMPLATE_PATH, 'common'),
  packages: PACKAGES,
};
