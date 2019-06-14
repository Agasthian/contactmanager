import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = props => {
  const { branding } = props;
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-danger mb-4'>
        <div className='container'>
          <a className='navbar-brand' href='/'>
            {branding}
          </a>
          <ul className='navbar-nav mr-5'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                <i className='fas fa-home' /> Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/about'>
                <i className='fas fa-question' /> About
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/contact/add'>
                <i className='fas fa-plus' /> Add
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

Header.propTypes = {
  branding: PropTypes.string.isRequired
};
export default Header;
