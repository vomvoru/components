import React from 'react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import ColorButton from '../src/ColorButton';

export default (storiesOf: (name: string, module: NodeModule) => Story) => {
  storiesOf('ColorButton', module).add(
    'ColorButton',
    withInfo()(() => <ColorButton color="blue" onClick={action('onClick')} />)
  );
};
