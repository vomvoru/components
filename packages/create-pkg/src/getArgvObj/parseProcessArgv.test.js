const parseProcessArgv = require('./parseProcessArgv');

const BASE_CONF_PATH = './__mocks__/base.conf.js';

const processCwdOrg = process.cwd;
const processArgvOrg = process.argv;
beforeAll(() => {
  process.cwd = () => __dirname;
});

afterAll(() => {
  process.cwd = processCwdOrg;
  process.argv = processArgvOrg;
});

describe('정상적인 사용시', () => {
  test('name, template, description값 설정', () => {
    process.argv = `node create-pkg -c ${BASE_CONF_PATH} -n b -t ts --description ddd`.split(' ');

    expect(parseProcessArgv()).toStrictEqual({
      configPath: BASE_CONF_PATH,
      description: 'ddd',
      template: 'ts',
      name: 'b',
    });
  });

  test('대화형 CLI 실행, inquirer값 설정', () => {
    process.argv = `node create-pkg -c ${BASE_CONF_PATH} -i`.split(' ');

    expect(parseProcessArgv()).toStrictEqual({
      configPath: BASE_CONF_PATH,
      inquirer: true,
    });
  });
});

describe('기본값 설정', () => {
  test('description값 값이 전달되지 않을시 name값으로 설정', () => {
    process.argv = `node create-pkg -c ${BASE_CONF_PATH} -n a -t ts`.split(' ');

    expect(parseProcessArgv()).toStrictEqual({
      configPath: BASE_CONF_PATH,
      description: 'a',
      template: 'ts',
      name: 'a',
    });
  });
});
