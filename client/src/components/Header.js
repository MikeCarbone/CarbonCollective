import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return(
    <ul className="nav__list">
        <li className="nav__item"><Link className="nav__link" to="/">Home</Link></li>
        <li className="nav__item"><Link className="nav__link" to="/new">New Post</Link></li>
    </ul>
  );
}

export default Header;