import React from 'react';

const Footer = () => (
  <footer className="footer">
    {/* <div className="footer__socials">
      <div className="cc__standard-wrapper cc__standard-wrapper--vert">
          <p>Follow</p>
      </div>
    </div> */}
    <div className="footer__copy">
      <div className="footer__wrapper cc__standard-wrapper cc__standard-wrapper--vert">
        <p className="footer__copywrite">© {new Date().getFullYear()} Carbon Collective&trade;</p>
        <a className="footer__twitter cc__link" href="https://twitter.com/crbncllctv" target="_blank" rel="noopener noreferrer">Follow our Twitter</a>
        <p className="footer__love">
          Built with <span role="img" className="cc__emoji" aria-label="love">🔥</span> by <a className="footer__love-link cc__text-link" href="https://twitter.com/carbnology" target="_blank" rel="noopener noreferrer">Mike Carbone</a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
