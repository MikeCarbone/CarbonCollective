import React, { Component } from 'react';
import { getDate } from '../generic/commonFunctions';
import { getDocTitle, setMetas } from '../generic/overallConfig';

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

    this.state = {
      posts: null,
      match
    }
  }

  componentWillReceiveProps({ match }) {
    (async () => {
      await this.setState({ match });
      this.fetchPost();
    })();
  }

  componentWillMount () {
    this.fetchPost();
  }

  fetchPost = () => {
    fetch(`/api/links/${this.state.match.params.name}`)
    .then(res => {
      if (res) {
        return res.json();
      } else {
        return null;
      }
    })
    .then(data => {
      if (data === null) { return }
      this.setState({ posts: data[0] });
    });
  }

  render () {
    if (this.state.posts) {
      const post = this.state.posts;

      document.title = getDocTitle(post.title);
      setMetas({title: post.title, imageUrl: post.imageUrl, slug: post.slug});
      return (
        <main className="generic__standard-wrapper full-post">
          <div className="full-post__top">
            <div className="full-post__importants">
              <div className="full-post__header-zone">
                <h1 className="full-post__header">{post.title}</h1>
              </div>
              <p className="full-post__desc">{post.description}</p>
              <div className="full-post__links">
                <div className="full-post__outlinks">
                  <a className="generic__link full-post__link" href={post.url} target="_blank" rel="noreferrer noopener">VIEW CONTENT</a>
                  <a className="generic__text-link full-post__source" href={post.related} target="_blank" rel="noreferrer noopener">View source</a>
                </div>
                <Tags tagArr={post.tags} />
              </div>
            </div>
            <div className="full-post__img-cont">
              <img alt="" className="full-post__img" src={post.imageUrl}/>
            </div>
          </div>
          <div className="generic__hr"></div>
          <div className="full-post__content">
            <p className="full-post__date">Added on {getDate(post.dateAdded)}</p>
            <div className="full-post__take">
              <h2 className="full-post__take-header">Justification</h2>
              <p className="full-post__take-text">{post.opinion}</p>
            </div>
          </div>
        </main>
      );
    } else {
      return null;
    }
  }
}

export default FullPost;