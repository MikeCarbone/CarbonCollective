import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBox';

const Header = () => {
  return (
    <nav className="nav">
      <Link to="/" className="generic__invisible-link"><h1 className="nav__title">Carbon Collective</h1></Link>
      <div className="nav__right">
        <SearchBar />
        <ul className="nav__list">
            <li className="nav__item"><Link className="nav__link" to="/">Home</Link></li>
            <li className="nav__item"><Link className="nav__link" to="/admin">Admin</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;