import React from "react";
import {Link} from 'react-router-dom';

const Nav = () => {
  return <nav className="menu">
          <ul className="menu__box">
            <li><Link className="menu__item" to='/'>Posts</Link></li>
            <li><Link className="menu__item" to='/authors'>Authors</Link></li>
          </ul> 
        </nav>;
};

export default Nav;
