import React from 'react';
import { withInfo } from '@storybook/addon-info';

import { Story } from '@storybook/react';
import BarWrapper from '@snacknews/bar-wrapper';
import Readme from '@snacknews/bar-wrapper/README.md';

export default (storiesOf: (name: string, module: NodeModule) => Story) => {
  storiesOf('default', module)
    .addParameters({
      readme: {
        sidebar: Readme,
      },
    })
    .add('BarWrapper', withInfo()(() => <BarWrapper>Hello</BarWrapper>));
};
