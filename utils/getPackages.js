const path = require('path');
const fs = require('fs');

const packagesFolder = path.resolve(__dirname, '../packages/');

const getPackages = () =>
  fs
    .readdirSync(packagesFolder)
    .filter(packageName => {
      try {
        return fs.lstatSync(path.resolve(packagesFolder, packageName)).isDirectory();
      } catch (e) {
        return false;
      }
    })
    .map(packageName => ({
      packageName,
      packagePath: path.resolve(packagesFolder, packageName),
    }));

module.exports = getPackages;
