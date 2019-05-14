const path = require('path');
const createPackageScripts = require('@vomvoru/package-scripts');

const ROOT = path.resolve(__dirname, '.');

module.exports = createPackageScripts({
  test: {
    configPath: path.resolve(ROOT, 'jest.config.js'),
  },
  eslint: {
    configPath: path.resolve(ROOT, '.eslintrc.js'),
    ignorePath: path.resolve(ROOT, '.gitignore'),
  },
  ts: {
    configPath: path.resolve(ROOT, 'tsconfig.json'),
  },
  createPkg: {
    configPath: path.resolve(ROOT, 'create-pkg.conf.js'),
  },
  babel: true,
  updateVersion: true,
  publish: true,
});
