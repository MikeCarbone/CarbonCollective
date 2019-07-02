import React, { Component } from 'react';
import Item from './Item';
import { getDocTitle } from '../generic/overallConfig'

class Homepage extends Component {
  state = {
    posts: []
  }

  componentWillMount () {
    fetch('/api/links')
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ posts: data });
      });
  }

  render() {

    document.title = getDocTitle('Home');

    return (
      <main className="posts-cont">
        <section className="posts-cont">
          <Item posts={this.state.posts} />
        </section>
      </main>
    );
  }
}

export default Homepage;