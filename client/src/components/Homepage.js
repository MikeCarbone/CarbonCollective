import React, { Component } from 'react';
import Item from './Item';
import { setMetas } from '../generic/overallConfig'

class Homepage extends Component {
  state = {
    posts: [],
    documentHeight: 0,
    isFetching: false,
    pagesLoaded: 1,
    allPostsLoaded: false
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

  paginate () {
    const posY = window.scrollY;
    const pagesLoaded = this.state.pagesLoaded;
    const pageToLoad = parseInt(pagesLoaded) + 1;

    if (posY > (this.state.documentHeight * .75)) {
      if (!this.state.isFetching && !this.state.allPostsLoaded) {

        this.setState({ isFetching: true });

        fetch(`/api/links/${pageToLoad}`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.length === 0) {
            console.log('All posts loaded!');

            this.setState({ isFetching: false });
            this.setState({ allPostsLoaded: true });
          } else {

            // Adds new posts to state
            this.appendNewPosts(data);

            (async () => {
              // Reset the document height after new posts are loaded in
              await this.setPageHeight();

              // Update how many pages are loaded
              await this.setState({ pagesLoaded: pageToLoad });

              // Allow new fetches again
              this.setState({ isFetching: false });
            })();
          }
        });
      }
    }
  }

  appendNewPosts (additionalPosts) {
    const currentPosts = this.state.posts;
    const newPosts = currentPosts.concat(additionalPosts);

    this.setState({ posts: newPosts });
  }

  async wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  async setPageHeight () {
    // Wait for the DOM to render all the posts
    // Pagination isnt urgent, so setTimeout is fine for now
    await this.wait(1500);

    const documentHeight = document.body.scrollHeight;
    this.setState({ documentHeight });

    return documentHeight;
  }

  componentDidMount () {
      (async () => {
        await this.setPageHeight();
        window.addEventListener('scroll', () => { this.paginate() });
      })();
  }

  render() {
    document.title = 'Carbon Collective'
    setMetas({ isDefault: true });

    const allPostsLoadedText = (this.state.allPostsLoaded)
      ? <p className="generic__p thats-all">That's all for now! <span aria-label="" role="img" className="generic__emoji">😎</span></p>
      : null;

    const loadingAnimation = (this.state.isFetching)
      ? <img className="loading" src="images/pacman-load.svg" alt="Loading"></img>
      : null;

    return (
      <main>
        <section className="posts-cont">
          <Item posts={this.state.posts} />
        </section>
        {loadingAnimation}
        {allPostsLoadedText}
      </main>
    );
  }
}

export default Homepage;