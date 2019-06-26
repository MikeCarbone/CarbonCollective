import React, { Component } from 'react';

const Tags = props => {
  if (props.tagArr) {
      const tagEls = props.tagArr.map((tag, index) => {
        return(
          <p key={index} className="full-post__tag">{tag}</p>
        );
      });
      return(
        <div className="full-post__tag-zone">
          {tagEls}
        </div>
      )
  }
}

class FullPost extends Component {
  constructor({ match }) {
    super();

    this.match = match;
  }

  state = {
    posts: null
  }

  componentWillMount () {
    fetch(`/links/${this.match.params.name}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ posts: data[0] });
      });
  }

  render () {
    if (this.state.posts) {
      const post = this.state.posts;
      console.log(post);
      return (
        <div className="generic__standard-wrapper full-post">
          <div className="full-post__top">
            <div className="full-post__header-zone">
              <h1 className="full-post__header">{post.title}</h1>
              <Tags tagArr={post.tags} />
            </div>
            <p className="full-post__desc">{post.description}</p>
          </div>
          <div className="generic__hr"></div>
          <div className="full-post__links">
            <a className="generic__link full-post__link" href={post.url} target="_blank" rel="noreferrer noopener">VIEW LINK</a>
          </div>
          <div className="full-post__content">
            <p className="full-post__source">Originally seen on: <a className="generic__text-link" href={post.related}>{post.source}</a></p>
            <h2>The Take:</h2>
            <p className="full-post__opinion">{post.opinion}</p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default FullPost;