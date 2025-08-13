import React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../../assets/img/logo.svg';

const Header = () => {
  const location = useLocation();
  const hidePaths = ['/landing', '/login', '/signup'];

  if (hidePaths.includes(location.pathname)) {
    return <div></div>;
  }

  return (
    <div className='header_wrap'>
      <img src={Logo} alt="logo" />
    </div>
  );
};

export default Header;
