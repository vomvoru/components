const { createTemplateQuestions } = require('./runInquirer');

describe('template 옵션 설정', () => {
  test('js, ts가 있는 경우', () => {
    const config = {
      template: {
        ts: 'ts',
        js: 'js',
      },
    };

    expect(createTemplateQuestions(config)).toMatchInlineSnapshot(`
      Object {
        "choices": Array [
          "ts",
          "js",
        ],
        "message": "템플릿",
        "name": "template",
        "type": "list",
      }
    `);
  });

  test('js가 있는 경우', () => {
    const config = {
      template: {
        js: 'js',
      },
    };

    expect(createTemplateQuestions(config)).toMatchInlineSnapshot(`
      Object {
        "choices": Array [
          "js",
        ],
        "message": "템플릿",
        "name": "template",
        "type": "list",
      }
    `);
  });
});
