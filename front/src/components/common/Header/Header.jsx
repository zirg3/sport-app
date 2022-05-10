import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import userImage from '../../../images/header/user.svg'
import arrowImage from '../../../images/header/arrow.svg'
import Hamburger from './Hamburger/Hamburger';
import styles from './Header.module.scss'

const Header = () => {

  const location = useLocation()
  const navigate = useNavigate()

  return (
      <header className={styles.header}>
        <Hamburger />
        {location.pathname !== '/' ?
            (<button type='button' onClick={() => navigate(-1)}>
              <img
                  src={arrowImage}
                  alt='Auth'
                  height='40'
                  width='40'
                  draggable={false}
              />
            </button>
            ) : (
             <button type='button'>
              <img
                  src={userImage}
                  alt='Auth'
                  height='40'
                  width='40'
                  draggable={false}
              />
            </button>)}
      </header>
  );
};

export default Header;
