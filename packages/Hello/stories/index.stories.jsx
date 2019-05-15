import React from 'react';
import { withInfo } from '@storybook/addon-info';

import Sample from '../src/index';

export default storiesOf => {
  storiesOf('Button123', module)
    .add('with text', withInfo({ inline: true })(() => <Sample>Hello Button</Sample>))
    .add(
      'with emoji',
      withInfo({ inline: true })(() => (
        <Sample>
          <span role="img" aria-label="so cool">
            😀 😎 👍 💯
          </span>
        </Sample>
      ))
    );
};
