import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from './Admin';
import Header from './Header'
import Homepage from './Homepage'
import FullPost from './FullPost';

const App = () => (
  <>
    <Header />

    <Switch>
      <Route path="/" exact component={Homepage}/>
      <Route path="/new" component={Admin} />
      <Route path="/cc/:name" component={FullPost} />
    </Switch>
  </>
);

export default App;