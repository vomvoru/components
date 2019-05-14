const path = require('path');
const checkNodeVersion = require('./checkNodeVersion');
const compileFiles = require('./compileFiles');
const copyTemplate = require('./copyTemplate');
const getArgvObj = require('./getArgvObj');
const { runInquirer } = require('./runInquirer');

/**
 * create-pkg 의 메인함수
 */
const createPkg = async () => {
  checkNodeVersion(8);

  let argv = getArgvObj();
  const { config } = argv;

  if (argv.inquirer) {
    argv = await runInquirer(config);
  }

  const sourceTemplatePath = config.template[argv.template];
  const commonTemplatePath = config.commonTemplate;
  const destination = path.resolve(config.packages, argv.name);

  await copyTemplate({
    source: sourceTemplatePath,
    common: commonTemplatePath,
    destination,
  });

  await compileFiles(destination, argv);
};

module.exports = createPkg;
