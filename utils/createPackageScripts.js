#!/usr/bin/env node
/* eslint-disable complexity */

const path = require('path');
const { open, series, rimraf, concurrent } = require('nps-utils');
const { getIndexFileType } = require('./getIndexFileType');

const indexFileType = getIndexFileType(path.resolve(process.cwd(), 'src'));

// Todo jsdoc
const createPackageScripts = config => {
  const scripts = {};

  /**
   * Test NPM Scripts
   */
  const testScript = `jest --coverage --passWithNoTests --config=${config.test.configPath}`;
  scripts.test = {
    default: {
      script: `${testScript} --projects .`,
      description: 'jest 테스트 실행',
    },
    watch: {
      script: `${testScript} --projects . --watchAll`,
      description: 'jest 테스트 실행 (파일 변경시 재시작)',
    },
    all: {
      script: testScript,
      description: '전체 jest 테스트 실행',
    },
    debug: {
      script: 'node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand',
      description: 'jest 테스트 디버깅 실행',
    },
    openCoverage: {
      script: open('./coverage/lcov-report/index.html'),
      description: 'coverage 결과 열기',
    },
  };

  /**
   * eslint NPM Scripts
   */
  const eslintOption =
    '. --color --clear --report-unused-disable-directives --cache ' +
    '--watch-ignore "/.eslintcache|.git|node_modules|bower_components/" ' +
    '--ext .js --ext .jsx --ext .ts --ext .tsx ' +
    `-c ${config.eslint.configPath} --ignore-path ${config.eslint.ignorePath}`;

  scripts.eslint = {
    default: {
      script: `esw ${eslintOption}`,
      description: 'eslint 실행',
    },
    quiet: {
      script: `esw ${eslintOption} --quiet`,
      description: 'warning조건은 출력하지 않는 eslint',
    },
    quietFix: {
      script: `esw ${eslintOption} --quiet --fix`,
      description: 'warning조건은 출력하지 않고 eslint autofix',
    },
    fix: {
      script: `esw ${eslintOption} --fix`,
      description: 'eslint autofix',
    },
    watch: {
      script: `esw ${eslintOption} --watch`,
      description: '파일 변경시 eslint 재실행',
    },
    autofix: {
      script: `esw ${eslintOption} --watch --fix`,
      description: '파일 변경시 eslint autofix',
    },
  };

  /**
   * Typescript type check NPM Scripts
   */
  scripts.typecheck = {
    default: {
      script: `tsc -p ${config.ts.configPath} --noEmit`,
      description: 'Typescript의 Type 체크',
    },
    watch: {
      script: `tsc -p ${config.ts.configPath} --noEmit --watch`,
      description: '파일 변경시 Typescript의 Type 체크',
    },
  };

  /**
   * create-pkg NPM Scripts
   */
  scripts.create = {
    component: {
      script: `create-pkg -c ${config.createPkg.configPath.component} -i`,
      description: '새로운 컴포넌트 패키지 추가',
    },
    page: {
      script: `create-pkg -c ${config.createPkg.configPath.page} -i`,
      description: '새로운 Page 패키지 추가',
    },
  };

  /**
   * build NPM Scripts
   */
  if (indexFileType) {
    scripts.build = {
      default: {
        script: series('nps build.clear', concurrent.nps('build.webpack', 'build.dts')),
        description: 'typesript 파일 빌드',
      },
      clear: {
        script: rimraf('./dist'),
        description: '빌드된 파일 삭제',
      },
      dts: {
        script: 'tsc -p ./tsconfig.json --emitDeclarationOnly',
        description: 'typescript 파일 d.ts 파일 생성',
      },
      webpack: {
        script: 'webpack',
        description: 'webpack 빌드',
      },
    };
  }

  /**
   * storybook NPM Scripts
   */
  scripts.storybook = {
    script: 'start-storybook',
    description: 'storybook dev sever 실행',
  };

  return scripts;
};

module.exports = createPackageScripts;
