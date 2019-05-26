import React from 'react';
import { withInfo } from '@storybook/addon-info';

import { Story } from '@storybook/react';
import Header from '../src/index';
import Readme from '../README.md';

export default (storiesOf: (name: string, module: NodeModule) => Story) => {
  storiesOf('default', module)
    .addParameters({
      readme: {
        sidebar: Readme,
        includePropTables: [Header],
      },
    })
    .add('Header', withInfo()(() => <Header />));
};
