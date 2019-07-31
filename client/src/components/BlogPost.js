import React, { Component } from 'react';
import { getDate } from '../generic/commonFunctions';
import { getDocTitle, setMetas } from '../generic/overallConfig';

const Tags = props => {
  if (props.tagArr) {
      const tagEls = props.tagArr.map((tag, index) => {
        return(
          <p key={index} className="blog-post__tag">{tag}</p>
        );
      });
      return(
        <div className="blog-post__tag-zone">
          {tagEls}
        </div>
      )
  }
}

const Socials = props => (
  <div className="socials">
    <a className="socials__link" href="https://twitter.com/crbncllctv" target="_blank" rel="noopener noreferrer" >
      <svg className={`socials__icon ${(props.isSecondary) ? 'socials__icon--secondary' : ''}`} aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
    </a>
  </div>
);

class BlogPost extends Component {
  constructor({ match }) {
    super();

    this.state = {
      post: null,
      match
    }
  }

  componentWillReceiveProps({ match }) {
    (async () => {
      await this.setState({ match });
      this.fetchPost();
    })();
  }

  // componentWillMount () {
  //   this.fetchPost();
  // }

  // fetchPost = () => {
  //   fetch(`/api/links/${this.state.match.params.name}`)
  //   .then(res => {
  //     if (res) {
  //       return res.json();
  //     } else {
  //       return null;
  //     }
  //   })
  //   .then(data => {
  //     if (data === null) { return }
  //     this.setState({ posts: data[0] });
  //   });
  // }

  render () {
    // if (this.state.posts) {
    //   const post = this.state.posts;

      document.title = getDocTitle('Post Title');
      // setMetas({title: post.title, imageUrl: post.imageUrl, slug: post.slug});

      // const source = (post.source.toLowerCase() !== 'unknown')
      //   ? (<a className="generic__text-link blog-post__source" href={post.related} target="_blank" rel="noreferrer noopener">View source</a>)
      //   : null;

      return (
        <main className="generic__standard-wrapper blog-post">
          <div className="blog-post__intro">
            <div className="blog-post__top">
              <div className="blog-post__importants">
                <div className="blog-post__header-zone">
                  <h1 className="blog-post__header">Full post title text</h1>
                </div>
                <p className="blog-post__desc">Its just what you should do</p>
                <Tags tagArr={['one', 'two', 'three']} />
              </div>
            </div>
            <div className="blog-post__img-cont">
              <img alt="" className="blog-post__img" src="./do_not_commit.svg"/>
            </div>
            <div className="generic__hr"></div>
            <div className="blog-post__byline">
              <p className="blog-post__date">Added on July 30, 2019 {/*getDate(post.dateAdded)*/}</p>
              <Socials />
              <p className="blog-post__author">By <a className="generic__text-link" href="https://twitter.com/carbnology" target="_blank" rel="noopener noreferrer">Mike Carbone</a> {/*getDate(post.dateAdded)*/}</p>
            </div>
          </div>
          <section className="blog-post__content">
            <h2>How it all got started</h2>
            <p>First of all, just getting to the theater presents difficulties. Leaving a home equipped with a TV and a video recorder isn't an attractive idea on a humid, cold, or rainy night. Even if the weather cooperates, there is still a thirty-minute drive to the theater down a congested highway, followed by the hassle of looking for a parking space. And then there are the lines. After hooking yourself to the end of a human chain, you worry about whether there will be enough tickets, whether you will get seats together, and whether many people will sneak into the line ahead of you.</p>
            <p>Tempor ut exercitation eiusmod ex. Dolor dolor laboris est occaecat consequat consectetur consectetur ut exercitation et reprehenderit esse commodo. Est quis amet aliqua nisi est dolor labore ullamco deserunt ex do dolor ex anim. Tempor pariatur mollit pariatur tempor elit laborum deserunt mollit eu eu. Quis exercitation aute culpa minim non id aliquip ad deserunt culpa aliquip sint elit. Labore sunt Lorem deserunt exercitation aliqua.</p>
            <h2>The first title of the content</h2>
            <p>First of all, just getting to the theater presents difficulties. Leaving a home equipped with a TV and a video recorder isn't an attractive idea on a humid, cold, or rainy night. Even if the weather cooperates, there is still a thirty-minute drive to the theater down a congested highway, followed by the hassle of looking for a parking space. And then there are the lines. After hooking yourself to the end of a human chain, you worry about whether there will be enough tickets, whether you will get seats together, and whether many people will sneak into the line ahead of you.</p>
            <img alt="" src="./do_not_commit.svg"/>
            <figcaption>This is a random ass fuckin picture using my glock to finna swat that mafk yuh</figcaption>
            <p>Tempor ut exercitation eiusmod ex. Dolor dolor laboris est occaecat consequat consectetur consectetur ut exercitation et reprehenderit esse commodo. Est quis amet aliqua nisi est dolor labore ullamco deserunt ex do dolor ex anim. Tempor pariatur mollit pariatur tempor elit laborum deserunt mollit eu eu. Quis exercitation aute culpa minim non id aliquip ad deserunt culpa aliquip sint elit. Labore sunt Lorem deserunt exercitation aliqua.</p>
          </section>
        </main>
      );
    // } else {
    //   return null;
    // }
  }
}

export default BlogPost;