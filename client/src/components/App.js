import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from './Admin';
import Header from './Header'
import Homepage from './Homepage'

const App = () => (
  <>
    <Header />

    <Switch>
      <Route path="/" exact component={Homepage}/>
      <Route path="/new" component={Admin} />
    </Switch>
  </>
);

export default App;