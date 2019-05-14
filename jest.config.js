const path = require('path');
const fs = require('fs');

const packagesFolder = path.resolve(__dirname, 'packages/');

const packages = fs.readdirSync(packagesFolder).filter(package => {
  try {
    return fs.lstatSync(path.resolve(packagesFolder, package)).isDirectory();
  } catch (e) {
    return false;
  }
});

const projects = packages.map(package => ({
  displayName: package,
  testMatch: [`${path.resolve(packagesFolder, package)}/**/*.test.[jt]s?(x)`],
}));

module.exports = {
  rootDir: process.cwd(),
  verbose: true,
  transform: {
    '^.+\\.[jt]sx?$': path.resolve(__dirname, './jest.config.babel.js'),
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  collectCoverageFrom: ['**/lib/**/*.[jt]s?(x)'],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      lines: 0,
      functions: 0,
    },
  },
  modulePathIgnorePatterns: ['__mocks__'],
  projects,
  // notify: true, // TODO 아래 이슈가 해결되고 사용해야 되는 옵션이다.
  // https://github.com/facebook/jest/issues/8036
};
