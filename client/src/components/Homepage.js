import React, { Component } from 'react';
import Item from './Item';

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
      });
  }

  render() {
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