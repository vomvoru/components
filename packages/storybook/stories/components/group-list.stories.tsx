import React from 'react';
import { withInfo } from '@storybook/addon-info';

import { Story } from '@storybook/react';
import GroupListHeader from '@snacknews/group-list';
import Readme from '@snacknews/group-list/README.md';

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
