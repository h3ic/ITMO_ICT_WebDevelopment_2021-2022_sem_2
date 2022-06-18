import {observer} from 'mobx-react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Main from './pages/Main';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';

import Profile from './pages/Profile';
import Experts from './pages/Experts';
import Participants from './pages/Participants';
import Rings from './pages/Rings';
import Report from './pages/Report';
import Misc from './pages/Misc';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Main/>}>
            <Route path={'register'} element={<Register/>}/>
            <Route path={'login'} element={<Login/>}/>
            <Route path={'logout'} element={<Logout/>}/>

            <Route path={'profile'} element={<Profile/>}/>
            <Route path={'experts'} element={<Experts/>}/>
            <Route path={'participants'} element={<Participants/>}/>
            <Route path={'rings'} element={<Rings/>}/>
            <Route path={'report'} element={<Report/>}/>
            <Route path={'misc'} element={<Misc/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default observer(App);
