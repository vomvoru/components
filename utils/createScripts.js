const createScripts = ({ jest }) => {
  const scripts = {};
  if (jest) {
    const jestScript = `jest --coverage --passWithNoTests --config=${jest.configPath}`;
    scripts.jest = {
      default: {
        script: `${jestScript} --projects .`,
        description: 'jest 테스트 실행',
      },
      all: {
        script: `${jestScript}`,
        description: 'jest 전체 테스트 실행',
      },
      watch: {
        script: `${jestScript} --projects . --watchAll`,
        description: 'jest 테스트 실행 (watch)',
      },
    };
  }

  return scripts;
};

module.exports = createScripts;
