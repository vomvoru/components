import { configure } from '@storybook/react';

function loadStories() {
  const req = require.context('../packages', true, /^((?![\\/]node_modules|vendor[\\/]).)*\.stories\.[jt]sx?$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);