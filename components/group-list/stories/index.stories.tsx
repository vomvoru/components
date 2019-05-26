import React from 'react';
import { withInfo } from '@storybook/addon-info';

import { Story } from '@storybook/react';
import GroupListHeader from '../src/GroupListHeader';
import Readme from '../README.md';

export default (storiesOf: (name: string, module: NodeModule) => Story) => {
  storiesOf('default', module)
    .addParameters({
      readme: {
        sidebar: Readme,
      },
    })
    .add(
      'GroupListHeader',
      withInfo()(() => <GroupListHeader text="1">Hello Button</GroupListHeader>)
    );
};
