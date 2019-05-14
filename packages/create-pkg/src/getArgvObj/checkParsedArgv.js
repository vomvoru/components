/**
 * 사용자가 입력한 값을 변환한 객체를 체크한다.
 * @param {object} result
 */
const checkParsedArgv = (parsedArgv, config) => {
  if (parsedArgv.inquirer) {
    return;
  }

  if (parsedArgv.name === '') {
    throw new Error('name (-n, --name <name>) 값을 입력해주세요.');
  }

  const templateKeys = Object.keys(config.template).join('|');
  const templateRegx = new RegExp(`^(${templateKeys})$`);

  if (templateRegx.test(parsedArgv.template) === false) {
    throw new Error(`template에는 ${templateKeys} 만 입력 가능합니다.`);
  }
};
module.exports = checkParsedArgv;
