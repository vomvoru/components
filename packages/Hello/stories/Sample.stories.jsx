import React from 'react';
import { withInfo } from '@storybook/addon-info';

import Sample from '../src/Sample';
import Readme from '../README.md';

export default storiesOf => {
  storiesOf('Button123', module)
    .addParameters({
      readme: {
        sidebar: Readme,
        includePropTables: [Sample],
      },
    })
    .add('with text', withInfo()(() => <Sample text="1">Hello Button</Sample>))
    .add(
      'with emoji',
      withInfo()(() => (
        <Sample text="2">
          <span role="img" aria-label="so cool">
            😀 😎 👍 💯
          </span>
        </Sample>
      ))
    );
};
