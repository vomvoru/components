const handlebars = require('handlebars');
const fs = require('mz/fs');
const globby = require('globby');

/**
 * 파일의 확장자를 제거
 * @param {string} filePath 확장자를 제거할 파일 경로
 * @param {string} ext 제거할 확장자
 */
const removeExtension = async (filePath, ext) => {
  const newFilePath = filePath.replace(new RegExp(`\\.${ext}$`), '');

  if (newFilePath === filePath) {
    return filePath;
  }

  await fs.rename(filePath, newFilePath);

  return newFilePath;
};

/**
 * 지정한 파일의 template 함수 반환
 * @param {string} filePath
 */
const getTemplate = async filePath => {
  const content = await fs.readFile(filePath, 'utf8');
  return handlebars.compile(content);
};

/**
 * handlebars를 이용하여 지정한 파일의 컴파일 및 hbs확장자 제거
 * @param {string} filePath
 * @param {object} data
 */
const compileFile = async (filePath, data) => {
  const template = await getTemplate(filePath);
  const compliedContent = template(data);
  await fs.writeFile(filePath, compliedContent, 'utf8');
  await removeExtension(filePath, 'hbs');
};

/**
 * handlebars를 이용하여 지정한 풀더의 파일들 컴파일 및 hbs확장자 제거
 * @param {*} dirPath
 * @param {*} data
 */
const compileFiles = async (dirPath, data) => {
  const files = await globby(dirPath, {
    dot: true,
  });

  const promises = files.map(async filePath => {
    await compileFile(filePath, data);
  });

  await Promise.all(promises);
};

module.exports = compileFiles;
