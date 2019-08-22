import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import { getDate } from '../generic/commonFunctions';

class Item extends Component {
  render () {
    return this.props.posts.map((post, index) => {
      return(
        <div key={index} className="post">
          <div className="post__img-cont">
            <LazyLoad height={150} offset={100}>
              <img alt="" className="post__img" src={post.imageUrl}/>
            </LazyLoad>
          </div>
          <div className="post__content-cont">
            <h2 className="post__title">{post.title}</h2>
            <p className="post__desc">{post.description}</p>
            <div className="post__btm">
              <div>
                <p className="post__date">Added on: <br className="post__date-break" />{getDate(post.dateAdded)}</p>
              </div>
              <div>
                <a className="cc__link post__in-link" href={`/cc/${post.slug}`}>Details</a>
                <a className="cc__link post__out-link" href={post.url} target="_blank" rel="noopener noreferrer" aria-label={`Go to ${post.title}`}>GO</a>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
}

export default Item;