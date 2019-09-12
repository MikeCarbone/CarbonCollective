import React from 'react';

const SocialAsk = props => (
  <div className="social-ask">
    <h2 className="social-ask__header">THANK YOU</h2>
    <div className="social-ask__hr cc__hr"></div>
    <p className="social-ask__text">Consider following our Twitter when new updates are posted!</p>
    <a className="cc__btn social-ask__btn" href="https://twitter.com/crbncllctv" target="_blank" rel="noopener noreferrer">FOLLOW</a>
    <button className="social-ask__quiet" onClick={props.stopAsking}>I'm good my guy; stop showing me this</button>
  </div>
);

export default SocialAsk;
