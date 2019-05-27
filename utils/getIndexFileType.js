const path = require('path');
const fs = require('fs');

const TYPESCRIPT = 'TYPESCRIPT';
const JAVASCRIPT = 'JAVASCRIPT';

const isFile = pathFile => {
  try {
    return fs.lstatSync(pathFile).isFile();
  } catch (err) {
    return false;
  }
};

const getIndexFilePaths = (indexFileDir, exts) =>
  exts.map(ext => path.resolve(indexFileDir, `index.${ext}`));

const getIndexFileType = indexFileDir => {
  if (getIndexFilePaths(indexFileDir, ['js', 'jsx']).some(isFile)) {
    return JAVASCRIPT;
  }

  if (getIndexFilePaths(indexFileDir, ['ts', 'tsx']).some(isFile)) {
    return TYPESCRIPT;
  }

  console.error('index 파일을 찾을수 없습니다.');
  return false;
};

module.exports = {
  getIndexFileType,
  TYPESCRIPT,
  JAVASCRIPT,
};
