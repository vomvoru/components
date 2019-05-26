import { configure, storiesOf, addDecorator, addParameters } from '@storybook/react';
import { addReadme } from 'storybook-readme';

import 'normalize.css'

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
  viewport: {
    defaultViewport: 'iphone6'
  }
});

const getPackageName = filename => {
  const regexResult = /^.\/([^\/]+)/.exec(filename);
  return regexResult === null ? '' : regexResult[1]
}

const runStory = (req, filename, prefix) => {
  const packageName = getPackageName(filename);
  const callback = req(filename).default;
  callback((name, module) => storiesOf(prefix + '/' + packageName + '/' + name, module))
}

const loadStories = () => {
  const reqComponents = require.context('../components', true, /^((?![\\/]node_modules|vendor[\\/]).)*\.stories\.[jt]sx?$/);
  const reqPages = require.context('../pages', true, /^((?![\\/]node_modules|vendor[\\/]).)*\.stories\.[jt]sx?$/);
  
  reqComponents.keys().forEach(filename => {
    runStory(reqComponents, filename, 'Components')
  });

  reqPages.keys().forEach(filename => {
    runStory(reqComponents, filename, 'Pages')
  });
}

configure(loadStories, module);