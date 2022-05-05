import React from 'react';
import styles from './Header.module.scss'

import userImage from '../../../images/header/user.svg'
import HamburgerImage from '../../../images/header/hamburger.svg'

const Header = () => {
  return (
      <header className={styles.header}>
        <button type='button'>
          <img
              src={HamburgerImage}
              width='29'
              height='23'
              alt='back'
              draggable={false}
          />
        </button>
        <button type='button'>
          <img
              src={userImage}
              alt='Auth'
              height='40'
              width='40'
              draggable={false}
          />
        </button>
      </header>
  );
};

export default Header;
