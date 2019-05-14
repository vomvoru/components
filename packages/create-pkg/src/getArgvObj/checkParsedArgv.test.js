const checkParsedArgv = require('./checkParsedArgv');

describe('정상적으로 사용', () => {
  test('값을 제대로 설정한 경우', () => {
    expect(() =>
      checkParsedArgv(
        {
          name: 'name',
          template: 'a',
          description: 'description',
        },
        {
          template: {
            a: 'a',
            b: 'b',
            c: 'c',
          },
        }
      )
    ).not.toThrowError();
  });
});

describe('값을 제대로 설정하지 않는 경우', () => {
  test('configPath 값이 전달되지 않을시', () => {
    expect(() =>
      checkParsedArgv(
        {
          name: '',
          template: 'template',
          description: 'description',
        },
        {}
      )
    ).toThrowErrorMatchingInlineSnapshot(`"name (-n, --name <name>) 값을 입력해주세요."`);
  });

  test('name 값이 전달되지 않을시', () => {
    expect(() =>
      checkParsedArgv(
        {
          name: '',
          template: 'template',
          description: 'description',
        },
        {}
      )
    ).toThrowErrorMatchingInlineSnapshot(`"name (-n, --name <name>) 값을 입력해주세요."`);
  });

  test('template값에 없는 템플릿 값을 전달시', () => {
    expect(() =>
      checkParsedArgv(
        {
          name: 'name',
          template: 'd',
          description: 'description',
        },
        {
          template: {
            a: 'a',
            b: 'b',
            c: 'c',
          },
        }
      )
    ).toThrowErrorMatchingInlineSnapshot(`"template에는 a|b|c 만 입력 가능합니다."`);
  });
});
