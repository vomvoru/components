import * as React from 'react';

interface GroupListHeaderProps {
  /** GroupListHeader text */
  text: string;
}

export const GroupListHeader: React.SFC<GroupListHeaderProps> = ({ children, text }) => (
  <div>
    <h1>GroupListHeader component</h1>
    <div>{children}</div>
    <span>{text}</span>
  </div>
);

export default GroupListHeader;
