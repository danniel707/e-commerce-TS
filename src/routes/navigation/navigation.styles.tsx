import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 70px;
  padding-left: 2em;
  padding-right: 2em;
  display: flex;
  justify-content: space-between;
  margin-bottom: 55px;
  border-bottom: 1px solid black;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white; // Optional: Add background color if needed
  z-index: 1;
  opacity: 0.9;
`;

export const Logo = styled(Link)`
  margin-top: 2px;
  margin-left: 30px;  
`

export const Brand = styled(Link)`  
  margin-top: 5px;
  margin-left: 460px;

`

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`

