import React from 'react';
import { withInfo } from '@storybook/addon-info';

import { Story } from '@storybook/react';
import Header from '../src/index';
import Readme from '../README.md';

export default (storiesOf: (name: string, module: NodeModule) => Story) => {
  storiesOf('Header', module)
    .addParameters({
      readme: {
        sidebar: Readme,
      },
    })
    .add('default', withInfo()(() => <Header />));
};
