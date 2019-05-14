const inquirer = require('inquirer');

/**
 * 설정 값에 따라 inquirer 매개변수를 만드는 함수
 * (테스트 코드를 이용한 검증을 위해 분리하였습니다.)
 * @param {*} config
 */
const createTemplateQuestions = config => ({
  type: 'list',
  name: 'template',
  message: '템플릿',
  choices: Object.keys(config.template),
});

const createQuestions = config => {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: '패키지 명',
    },
    {
      type: 'input',
      name: 'description',
      message: '패키지 설명',
      default: '',
    },
  ];

  return [...questions, createTemplateQuestions(config)];
};

const runInquirer = config => inquirer.prompt(createQuestions(config));

module.exports = {
  runInquirer,
  createTemplateQuestions,
};
