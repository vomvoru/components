import React from 'react';
import { withInfo } from '@storybook/addon-info';

import { Story } from '@storybook/react';
import BarWrapper from '../src/index';
import Readme from '../README.md';

export default (storiesOf: (name: string, module: NodeModule) => Story) => {
  storiesOf('Button123 ts', module)
    .addParameters({
      readme: {
        sidebar: Readme,
      },
    })
    .add('with text', withInfo()(() => <BarWrapper>Hello</BarWrapper>));
};
