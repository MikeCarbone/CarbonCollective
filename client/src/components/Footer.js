import React from 'react';

const Footer = () => (
  <footer className="footer">
    {/* <div className="footer__socials">
      <div className="generic__standard-wrapper generic__standard-wrapper--vert">
          <p>Follow</p>
      </div>
    </div> */}
    <div className="footer__copy">
      <div className="generic__standard-wrapper generic__standard-wrapper--vert">
        <p className="footer__copywrite">© {new Date().getFullYear()} Carbon Collective&trade;</p>
        <p className="footer__love">
          Built with <span className="generic__emoji">❤️</span> by <a className="footer__love-link generic__text-link" href="https://twitter.com/carbnology" target="_blank" rel="noopener noreferrer">Mike Carbone</a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
