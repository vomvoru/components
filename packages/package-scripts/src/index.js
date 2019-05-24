#!/usr/bin/env node
const path = require('path');
const { open, series, rimraf, concurrent } = require('nps-utils');
const { getIndexFileType, TYPESCRIPT } = require('./getIndexFileType');

const indexFileType = getIndexFileType(path.resolve(process.cwd(), 'src'));

// Todo jsdoc
const createPackageScripts = config => {
  const scripts = {};

  if (config.test) {
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
  }

  if (config.eslint) {
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
  }

  if (config.ts) {
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
  }

  if (config.createPkg) {
    /**
     * create-pkg NPM Scripts
     */
    scripts.create = {
      script: `create-pkg -c ${config.createPkg.configPath} -i`,
      description: '새로운 패키지 추가',
    };
  }

  if (config.babel) {
    /**
     * build NPM Scripts
     */
    if (indexFileType) {
      scripts.build = {
        default: {
          script: series.nps('build.clear', 'build.babel'),
          description: 'javasript 파일 빌드',
        },
        clear: {
          script: rimraf('./dist'),
          description: '빌드된 파일 삭제',
        },
        babel: {
          script: 'babel src --out-dir dist --root-mode upward --extensions .js,.jsx,.ts,.tsx',
          description: 'babel 빌드',
        },
      };
    }

    if (indexFileType === TYPESCRIPT) {
      scripts.build.dts = {
        script: 'tsc -p ./tsconfig.json --emitDeclarationOnly',
        description: 'typescript 파일 d.ts 파일 생성',
      };
      scripts.build.default = {
        script: series('nps build.clear', concurrent.nps('build.babel', 'build.dts')),
        description: 'typesript 파일 빌드',
      };
    }
  }

  if (config.updateVersion) {
    /**
     * version Update NPM Scripts
     */
    scripts.updateVersion = {
      dev: {
        script: series('npm version prerelease --preid=dev --no-git-tag-version'),
        description: 'package.json의 version 값을 dev update',
      },
      qa: {
        script: series('npm version prerelease --preid=qa --no-git-tag-version'),
        description: 'package.json의 version 값을 qa update',
      },
      release: {
        patch: {
          script: series('npm version patch --no-git-tag-version'),
          description: 'package.json의 version 값을 patch update',
        },
        minor: {
          script: series('npm version minor --no-git-tag-version'),
          description: 'package.json의 version 값을 minor update',
        },
        major: {
          script: series('npm version major --no-git-tag-version'),
          description: 'package.json의 version 값을 major update',
        },
      },
    };
  }

  if (config.publish) {
    scripts.publish = {
      dev: {
        script: 'npm publish --tag dev',
        description:
          '(Jenkins 전용) npm install <name>@dev 으로 설치 가능하도록 dist-tag를 설정한 npm publish',
      },
      qa: {
        script: 'npm publish --tag qa',
        description:
          '(Jenkins 전용) npm install <name>@dev 으로 설치 가능하도록 dist-tag를 설정한 npm publish',
      },
      release: {
        script: 'npm publish',
        description: '(Jenkins 전용) npm install <name> 으로 설치 가능하도록 npm publish',
      },
    };
  }

  return scripts;
};

module.exports = createPackageScripts;
