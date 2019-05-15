import React from 'react';

const Sample = ({ children }: { children: React.ReactNode }) => (
  <div>
    <h1>sample component</h1>
    <div>{children}</div>
  </div>
);

export default Sample;
