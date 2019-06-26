import React, { Component } from 'react';

class Editor extends Component {
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

  render () {
    return this.state.posts.map((post, index) => {
      return(
        <div key={index} className="post">
          <h2 className="post__title">{post.title}</h2>
          <p className="post__desc">{post.description}</p>
          <div className="post__btm">
            <p className="post__date">Added on: {post.dateAdded}</p>
            <a className="generic__link post__link" href={post.url} target="_blank" rel="noopener noreferrer">GO</a>
          </div>
        </div>
      );
    });
  }
}

export default Editor;