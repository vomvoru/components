const path = require('path');

const ROOT = path.resolve(__dirname, '.');
const TEMPLATE_PATH = path.resolve(ROOT, 'template');
const packages = path.resolve(ROOT, 'components');

module.exports = {
  template: {
    ts: path.resolve(TEMPLATE_PATH, 'ts'),
  },
  commonTemplate: path.resolve(TEMPLATE_PATH, 'common'),
  packages,
};
