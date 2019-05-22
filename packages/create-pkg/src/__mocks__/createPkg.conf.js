const path = require('path');

const ROOT = path.resolve(__dirname, '.');
const TEMPLATE_PATH = path.resolve(ROOT, 'template');
const PACKAGES = path.resolve(ROOT, 'packages');

module.exports = {
  template: {
    js: path.resolve(TEMPLATE_PATH, 'js'),
    ts: path.resolve(TEMPLATE_PATH, 'ts'),
  },
  commonTemplate: path.resolve(TEMPLATE_PATH, 'common'),
  packages: PACKAGES,
};
