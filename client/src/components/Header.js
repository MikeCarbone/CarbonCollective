import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return(
    <nav className="nav">
      <Link to="/" className="invisible-link"><h1 className="nav__title">Carbon Collective</h1></Link>
      <ul className="nav__list">
          <li className="nav__item"><Link className="nav__link" to="/">Home</Link></li>
          <li className="nav__item"><Link className="nav__link" to="/new">New Post</Link></li>
      </ul>
    </nav>
  );
}

export default Header;