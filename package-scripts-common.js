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
    configPath: path.resolve(process.cwd(), 'tsconfig.json'),
  },
  createPkg: {
    configPath: {
      component: path.resolve(ROOT, 'create-pkg.component.conf.js'),
      page: path.resolve(ROOT, 'create-pkg.page.conf.js'),
    },
  },
  babel: true,
  updateVersion: true,
  publish: true,
  storybook: true,
});
