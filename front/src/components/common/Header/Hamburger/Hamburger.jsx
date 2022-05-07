import React, {useState} from 'react';
import HamburgerImage from '../../../../images/header/hamburger.svg';
import HamburgerCloseImage from '../../../../images/header/hamburger-close.svg';
import styles from './Hamburger.module.scss'
import {menu} from './menuBase';
import {Link} from 'react-router-dom';

const Hamburger = () => {
  const [show, setShow] = useState(false)
  const handleLogout = () => {

  }

  return (
      <div className={styles.wrapper}>
        <button type='button' onClick={() => setShow(!show)}>
          <img
              src={show ? HamburgerCloseImage : HamburgerImage}
              width='29'
              height='23'
              alt='back'
              draggable={false}
          />
        </button>
        <nav className={`${styles.menu} ${show ? styles.show : ''}`}>
          <ul>
            {menu.map(item => (
                <li key={item.title}>
                  <Link to={item.link}>{item.title}</Link>
                </li>
            ))}
            <li>
              <button onClick={handleLogout}>Выйти</button>
            </li>
          </ul>
        </nav>
      </div>
  );
};

export default Hamburger;
