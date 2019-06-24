import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NewPost from './NewPost'
import Header from './Header'
import Homepage from './Homepage'

const App = () => (
  <>
    <Header />

    <Switch>
      <Route path="/" exact component={Homepage}/>
      <Route path="/new" component={NewPost} />
    </Switch>
  </>
);

export default App;