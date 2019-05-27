const merge = require('webpack-merge');
const path = require('path');
const common = require('../../webpack.common');

module.exports = merge(common, {
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
});
