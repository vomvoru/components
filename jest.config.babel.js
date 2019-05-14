const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  rootMode: 'upward',
});

// TODO 아래 PR이 merge 된다면 이 파일을 삭제할수 있음.
// https://github.com/facebook/jest/pull/7288
