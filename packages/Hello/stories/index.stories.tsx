import React from 'react';
import { Story } from '@storybook/react';
import Sample from '../src/index';

export default (storiesOf: (name: string, module: NodeModule) => Story) => {
  storiesOf('Button123 ts', module)
    .add('with text', () => <Sample>Hello Button</Sample>)
    .add('with emoji', () => (
      <Sample>
        <span role="img" aria-label="so cool">
          😀 😎 👍 💯
        </span>
      </Sample>
    ));
};
