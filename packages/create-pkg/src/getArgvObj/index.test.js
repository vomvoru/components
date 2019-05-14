const getArgvObj = require('./index');

const BASE_CONF_PATH = '../__mocks__/base.conf.js';

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

    expect(getArgvObj()).toStrictEqual({
      config: {
        commonTemplate: 'commonTemplate',
        packages: 'packages',
        template: {
          coffee: 'coffee',
          js: 'js',
          ts: 'ts',
        },
      },
      description: 'ddd',
      template: 'ts',
      name: 'b',
    });
  });

  test('대화형 CLI 실행, inquirer값 설정', () => {
    process.argv = `node create-pkg -c ${BASE_CONF_PATH} -i`.split(' ');

    expect(getArgvObj()).toStrictEqual({
      config: {
        commonTemplate: 'commonTemplate',
        packages: 'packages',
        template: {
          coffee: 'coffee',
          js: 'js',
          ts: 'ts',
        },
      },
      inquirer: true,
    });
  });
});

describe('config 파일을 잘못 설정할때', () => {
  test('설정파일이 설정되어있지 않을때', () => {
    process.argv = 'node create-pkg -i'.split(' ');

    expect(() => getArgvObj()).toThrowErrorMatchingInlineSnapshot(
      `"config (-c, --configPath <configPath>) 값을 입력해주세요."`
    );
  });

  test('설정파일이 존재하지 않는 파일일 경우', () => {
    process.argv = 'node create-pkg -c 123123temp123123.js -i'.split(' ');

    expect(() => getArgvObj()).toThrowError();
  });

  test('template 이 설정되어 있지 않으면', () => {
    process.argv = 'node create-pkg -c ../__mocks__/noTemplate.conf.js -i'.split(' ');

    expect(() => getArgvObj()).toThrowErrorMatchingInlineSnapshot(
      `"설정파일에서 template 값을 설정해주세요."`
    );
  });

  test('template을 빈객체로 설정시', () => {
    process.argv = 'node create-pkg -c ../__mocks__/emptyTemplate.conf.js -i'.split(' ');

    expect(() => getArgvObj()).toThrowErrorMatchingInlineSnapshot(
      `"설정파일에서 template 값을 설정해주세요."`
    );
  });

  test('commonTemplate을 빈객체로 설정시', () => {
    process.argv = 'node create-pkg -c ../__mocks__/noCommonTemplate.conf.js -i'.split(' ');

    expect(() => getArgvObj()).toThrowErrorMatchingInlineSnapshot(
      `"설정파일에서 commonTemplate 값을 설정해주세요."`
    );
  });

  test('packages을 빈객체로 설정시', () => {
    process.argv = 'node create-pkg -c ../__mocks__/noPackages.conf.js -i'.split(' ');

    expect(() => getArgvObj()).toThrowErrorMatchingInlineSnapshot(
      `"설정파일에서 packages 값을 설정해주세요."`
    );
  });
});

describe('에러 발생', () => {
  test('name 값이 전달되지 않을시 에러 발생', () => {
    process.argv = `node create-pkg -c ${BASE_CONF_PATH}`.split(' ');

    expect(() => getArgvObj()).toThrowErrorMatchingInlineSnapshot(
      `"name (-n, --name <name>) 값을 입력해주세요."`
    );
  });

  test('template값에 없는 템플릿 값을 전달시 에러 발생', () => {
    process.argv = `node create-pkg -c ${BASE_CONF_PATH} -n b -t vs`.split(' ');

    expect(() => getArgvObj()).toThrowErrorMatchingInlineSnapshot(
      `"template에는 coffee|js|ts 만 입력 가능합니다."`
    );
  });
});

describe('기본값 설정', () => {
  test('description값 값이 전달되지 않을시 name값으로 설정', () => {
    process.argv = `node create-pkg -c ${BASE_CONF_PATH} -n a -t ts`.split(' ');

    expect(getArgvObj()).toStrictEqual({
      config: {
        commonTemplate: 'commonTemplate',
        packages: 'packages',
        template: {
          coffee: 'coffee',
          js: 'js',
          ts: 'ts',
        },
      },
      description: 'a',
      template: 'ts',
      name: 'a',
    });
  });
});
