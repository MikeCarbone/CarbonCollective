import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NewPost from './NewPost'
import Header from './Header'

const Item = props => {
  return props.posts.map((post, index) => {
    return <li key={index}>{post.title}</li>
  });
}

class Homepage extends Component {
  state = {
    posts: []
  }

  componentWillMount () {
    fetch('/links')
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ posts: data });
        console.log(data);
      });
  }

  render() {
    return (
      <Item posts={this.state.posts} />
    );
  }
}

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