import * as React from 'react';

interface SampleProps {
  /** Sample text */
  text: string;
}

export const Sample: React.SFC<SampleProps> = ({ children, text }) => (
  <div>
    <h1>sample component</h1>
    <div>{children}</div>
    <span>{text}</span>
  </div>
);

export default Sample;
