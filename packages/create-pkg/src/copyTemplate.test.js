const fs = require('fs');
const mock = require('mock-fs');
const path = require('path');
const dircompare = require('dir-compare');

const copyTemplate = require('./copyTemplate');

const MOCK_PATH = 'path/to/fake';
const MOCK_COMMON_PATH = `${MOCK_PATH}/common`;
const MOCK_SOURCE_PATH = `${MOCK_PATH}/source`;
const MOCK_DEST_PATH = `${MOCK_PATH}/dest`;
const MOCK_SNAPSHOT_PATH = `${MOCK_PATH}/snapshot`;

beforeEach(() => {
  mock({
    'path/to/fake/common': {
      'common.js': '// common 풀더에 있는 common.js 파일',
      'temp.js': '// common 풀더에 있는 temp.js 파일',
    },
    'path/to/fake/source': {
      'common.js': '// source 풀더에 있는 common.js 파일',
      'abc.js': '// source 풀더에 있는 abc.js 파일',
      'temp.json.template': '// source 풀더에 있는 temp.json.template 파일',
    },
    'path/to/fake/snapshot': {
      'common.js': '// source 풀더에 있는 common.js 파일',
      'temp.js': '// common 풀더에 있는 temp.js 파일',
      'abc.js': '// source 풀더에 있는 abc.js 파일',
      'temp.json.template': '// source 풀더에 있는 temp.json.template 파일',
    },
  });
});

afterEach(mock.restore);

describe('템플릿 파일 복사 할때', () => {
  let dircompareReault;
  let differentDiffSet;

  beforeEach(async done => {
    await copyTemplate({
      source: MOCK_SOURCE_PATH,
      common: MOCK_COMMON_PATH,
      destination: MOCK_DEST_PATH,
    });

    const options = {
      compareContent: true,
      compareDate: false,
      compareSize: false,
    };

    dircompareReault = await dircompare.compare(MOCK_DEST_PATH, MOCK_SNAPSHOT_PATH, options);

    differentDiffSet = dircompareReault.diffSet.filter(({ state }) => state !== 'equal');

    done();
  });

  test('스냅샷과 동일해야 한다', () => {
    expect(dircompareReault.same).toEqual(true);
  });

  test('파일 구조가 동일해야 한다.', () => {
    const parseDiffSet = (orgDiffSet, postFix) => {
      const compareKey = ['name', 'type'];

      return orgDiffSet.map(diff =>
        compareKey.reduce((obj, key) => ({ ...obj, [key]: diff[`${key + postFix}`] }), {})
      );
    };

    const dest = parseDiffSet(differentDiffSet, '1');
    const snapshot = parseDiffSet(differentDiffSet, '2');

    expect(dest).toEqual(snapshot);
  });

  test('파일의 내용이 동일해야 한다', () => {
    const parseDiffSet = (orgDiffSet, postFix) => {
      const fileDiff = orgDiffSet.filter(diff => diff[`type${postFix}`] === 'file');

      return fileDiff.reduce((obj, diff) => {
        const fileName = diff[`name${postFix}`];
        const filePath = path.resolve(diff[`path${postFix}`], fileName);
        const fileRelativePath = path.relative(diff.relativePath, fileName);

        return {
          ...obj,
          [fileRelativePath]: fs.readFileSync(filePath, 'utf8'),
        };
      }, {});
    };

    const dest = parseDiffSet(differentDiffSet, '1');
    const snapshot = parseDiffSet(differentDiffSet, '2');

    expect(dest).toEqual(snapshot);
  });
});
