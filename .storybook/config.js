import { configure, storiesOf, addDecorator, addParameters } from '@storybook/react';
import { addReadme } from 'storybook-readme';

addDecorator(addReadme);

addParameters({
  options: {
    /**
     * show story component as full screen
     * @type {Boolean}
     */
    isFullscreen: false,
    /**
     * where to show the addon panel
     * @type {('bottom'|'right')}
     */
    panelPosition: 'right',
  },
});

const getPackageName = filename => {
  const regexResult = /^.\/([^\/]+)/.exec(filename);
  return regexResult === null ? '' : regexResult[1]
}

function loadStories() {
  const req = require.context('../packages', true, /^((?![\\/]node_modules|vendor[\\/]).)*\.stories\.[jt]sx?$/);
  req.keys().forEach(filename => {
    const packageName = getPackageName(filename);
    const callback = req(filename).default;
    callback((name, module) => storiesOf(packageName + '/' + name, module))
  });
}

configure(loadStories, module);