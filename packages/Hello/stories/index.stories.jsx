import React from 'react';

import Sample from '../src/index';

export default storiesOf => {
  storiesOf('Button123', module)
    .add('with text', () => <Sample>Hello Button</Sample>)
    .add('with emoji', () => (
      <Sample>
        <span role="img" aria-label="so cool">
          😀 😎 👍 💯
        </span>
      </Sample>
    ));
};
