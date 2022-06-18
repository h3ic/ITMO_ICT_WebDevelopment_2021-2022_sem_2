import {observer} from "mobx-react";
import {useEffect} from "react";
import {NavLink} from 'react-router-dom';
import Button from '@mui/material/Button'

import styled from "styled-components";
import useController from "../store";

const $Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 18px;
  background: white;

  ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: 4px;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 36px;
      background: lightgray;
      padding: 0 10px;
      border-radius: 4px;

      &:hover:not(.active) {
        background: darkgray;
      }
    }

    .active {
      background: gray;
    }
  }
`;

const NavBar = () => {

  const {controller} = useController();

  const menuItems = controller.isLogged
    ? [
      {
        label: 'Profile',
        link: '/profile'
      },
      {
        label: 'Experts',
        link: '/experts'
      },
      {
        label: 'Participants',
        link: '/participants'
      },
      {
        label: 'Rings',
        link: '/rings'
      },
      {
        label: 'Report',
        link: '/report'
      },
      {
        label: 'Misc',
        link: '/misc'
      },
      {
        label: 'Log out',
        link: '/logout'
      }
    ]
    : [
      {
        label: 'Log in',
        link: '/login'
      },
      {
        label: 'Register',
        link: '/register'
      }
    ];

  return (
    <$Navbar>
      <h3>Dogshow</h3>
      <ul>
        {menuItems.map((item, index) =>
          <li key={index}>
            <NavLink key={index} to={item.link}>
              {item.label}
            </NavLink>
          </li>
        )}
      </ul>
    </$Navbar>
  )
}

export default observer(NavBar);