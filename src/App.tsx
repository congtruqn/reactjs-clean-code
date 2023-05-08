import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom'
import './assets/scss/style.scss'
import SignIn from "./components/auth/SignIn";
import ChoiseFarm from "./components/Farm/choiseFarm";
import Dashboard from "./components/Layout/Default";
import {PrivateRoute} from "./routes/protected";
class App extends Component {
  render() {
    return (
        <Routes>
          <Route path={`/signin`} element={<SignIn />}></Route>
          <Route path={`/choisefarm`} element={<PrivateRoute ><ChoiseFarm /></PrivateRoute>}></Route>
          <Route path={`/*`} element={<PrivateRoute ><Dashboard /></PrivateRoute>}></Route>
        </Routes>
    );
  }
}
export default App;
