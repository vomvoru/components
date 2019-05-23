import * as React from 'react';
import styled from 'styled-components';
import { IoIosMenu } from 'react-icons/io';
import logo from '../img/logo.png';

interface HeaderProps {}

const Wrapper = styled.div`
  display: flex;
`;

const Gnb = styled.div`
  flex: none;
  margin-left: auto;
`;

export const Header: React.SFC<HeaderProps> = () => {
  return (
    <Wrapper>
      <Gnb>
        <img src={logo} alt="logo" />
        <IoIosMenu />
      </Gnb>
    </Wrapper>
  );
};

export default Header;

// import * as React from 'react';
// import { IoIosMenu } from 'react-icons/io';

// interface HeaderProps {}

// export const Header: React.SFC<HeaderProps> = () => <IoIosMenu />;

// export default Header;
