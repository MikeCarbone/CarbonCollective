import React, { Component } from 'react';
import Item from './Item';
import { setMetas } from '../generic/overallConfig'
import SocialAsk from './SocialAsk';

class Homepage extends Component {
  state = {
    posts: [],
    documentHeight: 0,
    isFetching: false,
    pagesLoaded: 1,
    allPostsLoaded: false,
    visitCount: 0,
    shouldAskSocialFollow: false,
    stopAsking: false
  }

  componentWillMount () {
    fetch('/api/links/all')
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

        fetch(`/api/links/all/${pageToLoad}`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.length === 0) {
            console.log('All posts loaded!');

            this.setState({
              isFetching: false,
              allPostsLoaded: true
            });
          } else {

            // Adds new posts to state
            this.appendNewPosts(data);

            (async () => {
              // Reset the document height after new posts are loaded in
              await this.setPageHeight();

              // Update how many pages are loaded
              // Allow new fetches again
              this.setState({
                pagesLoaded: pageToLoad,
                isFetching: false
              });

              if (data.length < 25) {
                this.setState({ allPostsLoaded: true });
              }
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

  trackVisit () {
    (async () => {
      const visitCount = parseInt(localStorage.getItem('visits')) + 1 || 1;
      const shouldNotAsk = JSON.parse(localStorage.getItem('stopAsking'));
      localStorage.setItem('visits', visitCount);
      await this.setState({
          visitCount,
          stopAsking: shouldNotAsk
      });

      this.shouldAskSocialFollow();
    })();
  }

  shouldAskSocialFollow () {
    if ((this.state.visitCount > 5) && (!this.state.stopAsking)) {
      this.setState({ shouldAskSocialFollow: true });
    } else {
      this.setState({ shouldAskSocialFollow: false });
    }
  }

  stopAsking = () => {
    (async() => {
      localStorage.setItem('stopAsking', true);
      await this.setState({ stopAsking: true });

      this.shouldAskSocialFollow();
    })();
  }

  componentDidMount () {
      (async () => {
        await this.setPageHeight();
        window.addEventListener('scroll', () => { this.paginate() });

        document.title = 'Carbon Collective'
        setMetas({ isDefault: true });

        this.trackVisit();
      })();
  }

  render() {
    const allPostsLoadedText = (this.state.allPostsLoaded)
      ? <p className="cc__p thats-all">That's all for now! <span aria-label="" role="img" className="cc__emoji">😎</span></p>
      : <p className="cc__p cc__hidden thats-all">That's all for now! <span aria-label="" role="img" className="cc__emoji">😎</span></p>;

    const loadingAnimation = (this.state.isFetching)
      ? <img className="loading" src="images/pacman-load.svg" alt="Loading"></img>
      : <img className="loading cc__hidden" src="images/pacman-load.svg" alt=""></img>

    const socialAsk = (this.state.shouldAskSocialFollow)
      ? <SocialAsk stopAsking={this.stopAsking} />
      : null;

    return (
      <main>
        {socialAsk}
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
