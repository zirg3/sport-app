import React, {useState} from 'react';
import HamburgerImage from '../../../../images/header/hamburger.svg';
import HamburgerCloseImage from '../../../../images/header/hamburger-close.svg';
import styles from './Hamburger.module.scss'
import {menu} from './menuBase';
import {Link, useNavigate} from 'react-router-dom';
import {useOutsideAlerter} from '../../../../hooks/useOutsideAlerter';
import {useAuth} from '../../../../hooks/useAuth';

const Hamburger = () => {
  const {setIsAuth, setUserLogin} = useAuth()
  const { ref, isComponentVisible, setIsComponentVisible} = useOutsideAlerter(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuth(false)
    setUserLogin('')
    navigate('/auth', {replace: true})
    setIsComponentVisible(false)
  }

  return (
      <div className={styles.wrapper} ref={ref}>
        <button type='button' onClick={() => setIsComponentVisible(!isComponentVisible)}>
          <img
              src={isComponentVisible ? HamburgerCloseImage : HamburgerImage}
              width='29'
              height='23'
              alt='back'
              draggable={false}
          />
        </button>
        <nav className={`${styles.menu} ${isComponentVisible ? styles.show : ''}`}>
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
