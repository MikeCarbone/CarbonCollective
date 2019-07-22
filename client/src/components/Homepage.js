import React, { Component } from 'react';
import Item from './Item';
import { setMetas } from '../generic/overallConfig'

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

    document.title = 'Carbon Collective'
    setMetas({isHome: true})
    return (
      <main>
        <section className="posts-cont">
          <Item posts={this.state.posts} />
        </section>
      </main>
    );
  }
}

export default Homepage;