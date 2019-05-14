const fs = require('mz/fs');
const mock = require('mock-fs');
const globby = require('globby');
const compileFiles = require('./compileFiles');

const dirPath = 'path/to/fake/dir';

beforeEach(() => {
  mock({
    [dirPath]: {
      'file.md.hbs': `{{title}}
{{description}}`,
      'file2.md.hbs': `{{title}}`,
      'file3.md': `{{title}}`,
    },
  });
});

afterEach(mock.restore);

test('파일 컴파일 테스트', async () => {
  await compileFiles(dirPath, {
    title: 'title1',
    description: 'desc',
  });

  const filePaths = await globby(dirPath, {
    dot: true,
  });

  const files = filePaths.reduce(
    (obj, filePath) => ({
      ...obj,
      [filePath]: fs.readFileSync(filePath, 'utf8'),
    }),
    {}
  );

  expect(files).toMatchInlineSnapshot(`
    Object {
      "path/to/fake/dir/file.md": "title1
    desc",
      "path/to/fake/dir/file2.md": "title1",
      "path/to/fake/dir/file3.md": "title1",
    }
  `);
});
