import React from 'react';
import userImage from '../../../images/header/user.svg'
import Hamburger from './Hamburger/Hamburger';
import styles from './Header.module.scss'

const Header = () => {
  return (
      <header className={styles.header}>
        <Hamburger />
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
