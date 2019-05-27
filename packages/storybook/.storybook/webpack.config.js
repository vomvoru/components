// var nodeExternals = require('webpack-node-externals');
const babelConfig = require('../../../babel.config')

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          ...babelConfig,
        },
      },
      require.resolve("react-docgen-typescript-loader"),
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');

  // if(Array.isArray(config.externals) === false){
  //   config.externals = [];
  // }
  
  // config.externals.push(nodeExternals({
  //   modulesFromFile: true,
  // }))

  return config;
};