import React, { Component } from 'react';
import { getDate } from '../generic/commonFunctions';

class Item extends Component {
  render () {
    return this.props.posts.map((post, index) => {
      return(
        <div key={index} className="post">
          <div className="post__img-cont">
            <img alt="" className="post__img" src="https://via.placeholder.com/800x500"/>
          </div>
          <div>
            <h2 className="post__title">{post.title}</h2>
            <p className="post__desc">{post.description}</p>
            <div className="post__btm">
              <p className="post__date">Added on: {getDate(post.dateAdded)}</p>
              <a className="generic__link post__in-link" href={`/cc/${post.slug}`}>Details</a>
              <a className="generic__link post__out-link" href={post.url} target="_blank" rel="noopener noreferrer">GO</a>
            </div>
          </div>
        </div>
      );
    });
  }
}

export default Item;