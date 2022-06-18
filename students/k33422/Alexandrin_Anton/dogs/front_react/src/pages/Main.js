import {observer} from "mobx-react";
import NavBar from "../components/NavBar";
import {Outlet} from "react-router-dom";
import styled from "styled-components";

const $Content = styled.div`
  margin: auto auto;
`

const Main = () => {
  return (
    <div style={{height: '100vh', background: 'wheat'}}>
      <NavBar/>
      <$Content>
        <Outlet/>
      </$Content>
    </div>
  )
}

export default observer(Main);