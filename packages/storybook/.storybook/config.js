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

const getPrefix = filename => {
  const namespaces = filename.replace(/^.\//, '').split('/')
  namespaces.pop();
  return namespaces.join('/')
}

const loadStories = () => {
  const req = require.context('../stories', true, /^((?![\\/]node_modules|vendor[\\/]).)*\.stories\.[jt]sx?$/);
  
  req.keys().forEach(filename => {
    const prefix = getPrefix(filename)
    const callback = req(filename).default;
    callback((name, module) => storiesOf(prefix + '/' + name, module))
  });
}

configure(loadStories, module);