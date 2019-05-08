const path = require('path');
const fs = require('fs');

const getProjects = packagesFolder => {
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

  return projects;
};

const projects = [
  ...getProjects(path.resolve(__dirname, './client-packages/')),
  ...getProjects(path.resolve(__dirname, './server-packages/')),
];

module.exports = {
  rootDir: process.cwd(),
  verbose: true,
  clearMocks: true,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  errorOnDeprecated: false,
  // TODO https://github.com/facebook/jest/issues/7890 이슈가 해결되어야 notify 옵션을 사용 가능함.
  // notify: true,
  notifyMode: 'always',
  projects,
  transform: {
    '^.+\\.[jt]sx?$': path.resolve(__dirname, './jest.babel.js'),
  },
};
