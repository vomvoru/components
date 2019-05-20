import React from 'react';
import { withInfo } from '@storybook/addon-info';
import { Story } from '@storybook/react';
import Sample from '../src/Sample';

export default (storiesOf: (name: string, module: NodeModule) => Story) => {
  storiesOf('Sample', module).add(
    'Sample',
    withInfo()(() => <Sample text="1">Hello Button</Sample>)
  );
};
