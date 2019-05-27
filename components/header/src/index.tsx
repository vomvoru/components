import * as React from 'react';
import styled from 'styled-components';
import { FiMenu } from 'react-icons/fi';

import logo from '../img/logo.png';

interface HeaderProps {}

const Wrapper = styled.div`
  display: flex;
  margin-left: auto;
  height: 54px;
  align-items: center;
  background-color: #fffefe;
  border-bottom: 1px solid #e7e7e7;
`;

const Logo = () => (
  <div>
    <img
      src={logo}
      alt="logo"
      style={{
        height: '22px',
        justifyContent: 'center',
        padding: '0 24px',
      }}
    />
  </div>
);

const Center = styled.div`
  flex: 1;
`;

const Menu = () => (
  <div
    style={{
      height: '30px',
      width: '30px',
      padding: '0 13px',
    }}
  >
    <FiMenu
      style={{
        fontSize: '24px',
        color: '#0b66f7',
      }}
    />
  </div>
);

export const Header: React.SFC<HeaderProps> = () => {
  return (
    <Wrapper>
      <Logo />
      <Center />
      <Menu />
    </Wrapper>
  );
};

export default Header;
