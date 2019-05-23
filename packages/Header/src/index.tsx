import * as React from 'react';

interface HeaderProps {
  /** Header text */
  text: string;
}

export const Header: React.SFC<HeaderProps> = ({ children, text }) => (
  <div>
    <h1>Header component</h1>
    <div>{children}</div>
    <span>{text}</span>
  </div>
);

export default Header;
