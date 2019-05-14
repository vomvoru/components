const { Command } = require('commander');

/**
 * 사용자가 CLI로 입력한 값을 파싱후 객체로 변경하여 리턴한다.
 */
const parse = () => {
  const program = new Command();

  program
    .option('-c, --configPath <configPath>', '설정 파일', '')
    .option('-n, --name <name>', '패키지 명', '')
    .option('-t, --template <template>', '템플릿', '')
    .option('-d, --description <desc>', '패키지 설명', '')
    .option('-i, --inquirer', '대화형 CLI 실행')
    .parse(process.argv);

  return {
    inquirer: program.inquirer,
    name: program.name,
    template: program.template,
    description: program.description,
    configPath: program.configPath,
  };
};

/**
 * 사용자가 입력한 값을 변환한 객체에 기본값을 설정한다.
 * @param {object} parsedArgv
 */
const setDefault = parsedArgv => {
  return {
    ...parsedArgv,
    inquirer: parsedArgv.inquirer === true,
    description: parsedArgv.description === '' ? parsedArgv.name : parsedArgv.description,
  };
};

/**
 * 사용자가 입력한 값을 객체로 변환하고 기본값을 설정하고 객체를 리턴한다.
 * @param {object} result
 */
const parseProcessArgv = () => {
  let parsedArgv = parse(process.argv);
  parsedArgv = setDefault(parsedArgv);

  if (parsedArgv.inquirer) {
    return {
      inquirer: parsedArgv.inquirer,
      configPath: parsedArgv.configPath,
    };
  }

  return {
    name: parsedArgv.name,
    template: parsedArgv.template,
    description: parsedArgv.description,
    configPath: parsedArgv.configPath,
  };
};

module.exports = parseProcessArgv;
