const fs = require('mz/fs');
const path = require('path');
const mock = require('mock-fs');
const globby = require('globby');
const createPkg = require('./createPkg');

const configPath = './__mocks__/createPkg.conf.js';
// eslint-disable-next-line import/no-dynamic-require
const config = require(configPath);

const ROOT = path.resolve(__dirname, '.');

const processCwdOrg = process.cwd;
const processArgvOrg = process.argv;

beforeEach(() => {
  process.cwd = () => __dirname;

  mock({
    [path.resolve(__dirname, configPath)]: `
    const path = require('path');

    const ROOT = path.resolve(__dirname, '.');
    const TEMPLATE_PATH = path.resolve(ROOT, 'template');
    const PACKAGES = path.resolve(ROOT, 'packages');
    
    module.exports = {
      template: {
        js: path.resolve(TEMPLATE_PATH, 'js-util'),
        ts: path.resolve(TEMPLATE_PATH, 'ts-util'),
      },
      commonTemplate: path.resolve(TEMPLATE_PATH, 'common'),
      packages: PACKAGES,
    };
    `,
    [config.commonTemplate]: {
      common: 'common풀더 common파일 {{name}} {{description}}',
      abc: 'common풀더 abc파일 {{name}} {{description}}',
    },
    [config.template.js]: {
      common: 'js풀더 common파일 {{name}} {{description}}',
      js: 'js풀더 js파일 {{name}} {{description}}',
    },
    [config.template.ts]: {
      common: 'ts풀더 common파일 {{name}} {{description}}',
      ts: 'ts풀더 ts파일 {{name}} {{description}}',
    },
    [config.packages]: {},
  });
});

afterEach(() => {
  process.cwd = processCwdOrg;
  process.argv = processArgvOrg;

  mock.restore();
});

const getFiles = async dirPath => {
  const filePaths = await globby(dirPath, {
    dot: true,
  });

  return filePaths.reduce(
    (obj, filePath) => ({
      ...obj,
      [path.relative(ROOT, filePath)]: fs.readFileSync(filePath, 'utf8'),
    }),
    {}
  );
};

describe('createPkg 을 실행하면', () => {
  test('name값을 설정할때', async () => {
    process.argv = `node create -c ${configPath} -n temp -t js`.split(' ');

    await createPkg();

    const commonFiles = await getFiles(config.commonTemplate);
    const jsFiles = await getFiles(config.template.js);
    const tsFiles = await getFiles(config.template.ts);
    const packagesFiles = await getFiles(config.packages);

    expect(commonFiles).toMatchInlineSnapshot(`
      Object {
        "__mocks__/template/common/abc": "common풀더 abc파일 {{name}} {{description}}",
        "__mocks__/template/common/common": "common풀더 common파일 {{name}} {{description}}",
      }
    `);
    expect(jsFiles).toMatchInlineSnapshot(`
      Object {
        "__mocks__/template/js-util/common": "js풀더 common파일 {{name}} {{description}}",
        "__mocks__/template/js-util/js": "js풀더 js파일 {{name}} {{description}}",
      }
    `);
    expect(tsFiles).toMatchInlineSnapshot(`
      Object {
        "__mocks__/template/ts-util/common": "ts풀더 common파일 {{name}} {{description}}",
        "__mocks__/template/ts-util/ts": "ts풀더 ts파일 {{name}} {{description}}",
      }
    `);
    expect(packagesFiles).toMatchInlineSnapshot(`
      Object {
        "__mocks__/packages/temp/abc": "common풀더 abc파일 temp temp",
        "__mocks__/packages/temp/common": "js풀더 common파일 temp temp",
        "__mocks__/packages/temp/js": "js풀더 js파일 temp temp",
      }
    `);
  });

  test('description값을 설정할때', async () => {
    process.argv = `node create -c ${configPath} -n temp -d desc -t js`.split(' ');

    await createPkg();

    const commonFiles = await getFiles(config.commonTemplate);
    const jsFiles = await getFiles(config.template.js);
    const tsFiles = await getFiles(config.template.ts);
    const packagesFiles = await getFiles(config.packages);

    expect(commonFiles).toMatchInlineSnapshot(`
            Object {
              "__mocks__/template/common/abc": "common풀더 abc파일 {{name}} {{description}}",
              "__mocks__/template/common/common": "common풀더 common파일 {{name}} {{description}}",
            }
        `);
    expect(jsFiles).toMatchInlineSnapshot(`
            Object {
              "__mocks__/template/js-util/common": "js풀더 common파일 {{name}} {{description}}",
              "__mocks__/template/js-util/js": "js풀더 js파일 {{name}} {{description}}",
            }
        `);
    expect(tsFiles).toMatchInlineSnapshot(`
            Object {
              "__mocks__/template/ts-util/common": "ts풀더 common파일 {{name}} {{description}}",
              "__mocks__/template/ts-util/ts": "ts풀더 ts파일 {{name}} {{description}}",
            }
        `);
    expect(packagesFiles).toMatchInlineSnapshot(`
            Object {
              "__mocks__/packages/temp/abc": "common풀더 abc파일 temp desc",
              "__mocks__/packages/temp/common": "js풀더 common파일 temp desc",
              "__mocks__/packages/temp/js": "js풀더 js파일 temp desc",
            }
        `);
  });
});
