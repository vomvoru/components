import { configure } from '@storybook/react';

function loadStories() {
  //  require('../stories/index.stories')
  require('../packages/Hello/stories/index.stories')
}

configure(loadStories, module);