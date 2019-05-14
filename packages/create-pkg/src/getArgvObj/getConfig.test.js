const getConfig = require('./getConfig');

const processCwdOrg = process.cwd;

beforeAll(() => {
  process.cwd = () => __dirname;
});

afterAll(() => {
  process.cwd = processCwdOrg;
});

describe('config 파일에 문제가 없을때', () => {
  test('설정파일이 설정되어있지 않을때', () => {
    expect(getConfig('../__mocks__/base.conf.js')).toEqual({
      template: {
        coffee: 'coffee',
        js: 'js',
        ts: 'ts',
      },
      commonTemplate: 'commonTemplate',
      packages: 'packages',
    });
  });
});

describe('config 파일을 잘못 설정할때', () => {
  test('설정파일이 설정되어있지 않을때', () => {
    expect(() => getConfig()).toThrowErrorMatchingInlineSnapshot(
      `"config (-c, --configPath <configPath>) 값을 입력해주세요."`
    );
  });

  test('설정파일이 존재하지 않는 파일일 경우', () => {
    expect(() => getConfig('../__mocks__/abcdefg.abcdefg.js')).toThrowError(/^Cannot find module/);
  });

  test('template 이 설정되어 있지 않으면', () => {
    expect(() => getConfig('../__mocks__/noTemplate.conf.js')).toThrowErrorMatchingInlineSnapshot(
      `"설정파일에서 template 값을 설정해주세요."`
    );
  });

  test('template을 빈객체로 설정시', () => {
    expect(() =>
      getConfig('../__mocks__/emptyTemplate.conf.js')
    ).toThrowErrorMatchingInlineSnapshot(`"설정파일에서 template 값을 설정해주세요."`);
  });

  test('commonTemplate을 빈객체로 설정시', () => {
    expect(() =>
      getConfig('../__mocks__/noCommonTemplate.conf.js')
    ).toThrowErrorMatchingInlineSnapshot(`"설정파일에서 commonTemplate 값을 설정해주세요."`);
  });

  test('packages을 빈객체로 설정시', () => {
    expect(() => getConfig('../__mocks__/noPackages.conf.js')).toThrowErrorMatchingInlineSnapshot(
      `"설정파일에서 packages 값을 설정해주세요."`
    );
  });
});
