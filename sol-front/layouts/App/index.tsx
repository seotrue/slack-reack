import loadable from '@loadable/component';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Workspace = loadable(() => import('@layouts/Workspace'));
const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));


const App = () => (
  <Switch>
    <Route exact path="/"  to="/login" >
      <Redirect to="/login" />
    </Route>
    <Route path="/login" component={LogIn} />
    <Route path="/signup" component={SignUp} />
    {/* 사용자가 파라미터로 넣을수 잇음 => /: 뒤에 오는 단어*/}
    <Route path="/workspace/:workspace" component={Workspace} />
  </Switch>
);

export default App;
