import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBox';

const Header = () => {
  return (
    <nav className="nav">
      <Link to="/" className="cc__invisible-link"><h1 className="nav__title">Carbon Collective</h1></Link>
      <div className="nav__right">
        <SearchBar />
        <ul className="nav__list">
            <li className="nav__item"><Link className="nav__link" to="/">Home</Link></li>
            <li className="nav__item"><Link className="nav__link" to="/about">About</Link></li>
            {/* <li className="nav__item"><Link className="nav__link" to="/admin">Admin</Link></li> */}
            <li className="nav__item"><Link className="nav__link" to="/saves">Quicksaves</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
