import React from 'react';

class Item extends Component {
  getDate(timeString) {
    var friendlyDate = new Date(timeString);
    var pieces = friendlyDate.toString().split(' ');
    return `${pieces[0]} ${pieces[1]} ${pieces[2]}, ${pieces[3]}`;
  }

  render () {
    return this.props.posts.map((post, index) => {
      return(
        <div key={index} className="post">
          <h2 className="post__title">{post.title}</h2>
          <p className="post__desc">{post.description}</p>
          <p className="post__date">Added on: {this.getDate(post.dateAdded)}</p>
          <a className="post__link" href={post.url} target="_blank" rel="noopener noreferrer">GO</a>
        </div>
      );
    });
  }
}

export default Item;