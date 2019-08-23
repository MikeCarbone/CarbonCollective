import React, { Component } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

class About extends Component {
  render() {
    return (
      <>
        <main className="cc__standard-wrapper text-template">
          <LazyLoad>
            <img  srcSet=" images/welcome_banner_small.jpg 600w,
                            images/welcome_banner.jpg 1200w"
                  sizes="  (max-width: 767px) 400px,
                            1200px"
                  src="images/welcome_banner.jpg"
                  alt="Welcome"
                  className="text-template__img">
            </img>
          </LazyLoad>
          <div className="cc__hr"></div>
          <h2>Hey, welcome to Carbon Collective.</h2>
          <p>
            The main focus of this website is a place for me to store and organize all the crazy, useful, or interesting links I find on the internet.
            Rather than sending myself an email every time I found something I wanted to save, I built this.
            If you're thinking "damn, this is major overkill for something so simple", you're exactly right. This is majorly overkill for the concept.
            BUT, as I developed Carbon Collective, it has evolved into a development playground where I experiment implementing different tools, techniques, APIs, or whatever else I want.
            It has become an experimental learning environment.
          </p>
          <p>So far, these are things I've implemented that I've never done before:</p>
          <ul>
            <li>React SPA served from Node Express server</li>
            <li>JSON token authorization</li>
            <li>Client-side protected routes (aka private components)</li>
            <li>Custom content management system</li>
            <li>Search functionality</li>
            <li>Google Cloud image hosting</li>
            <li>Twitter API integration</li>
            <li>Infinite scroll pagination</li>
          </ul>
          <p>
            That's a pretty big list now that I wrote it out! Damn!
            Anyways, this project was started July 2019 and I plan to keep adding whatever things I'd like to learn next.
            If you're interested in this resource, new updates will be tweeted <a className="cc__text-link" href="https://twitter.com/crbncllctv" target="_blank" rel="noopener noreferrer">@crbncllctv</a>.
            I've also been tweeting about building this <a className="cc__text-link" href="https://twitter.com/carbnology" target="_blank" rel="noopener noreferrer">@carbnology</a>.
            Feel free to shoot me a tweet at either of those accounts if you'd like something added or whatever.
          </p>
          <p>Here's two tweets:</p>
          <div className="tweet-container">
            <TwitterTweetEmbed tweetId={'1163798261662191618'} />
            <TwitterTweetEmbed tweetId={'1154846822592143361'} />
          </div>
          <p>That's it for now! I plan on updating this as I continue development.</p>
          <Link to="/" className="cc__btn">View Collection</Link>
        </main>
      </>
    )
  }
}

export default About;
