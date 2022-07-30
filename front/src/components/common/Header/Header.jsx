import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import userImage from '../../../images/header/user.svg'
import authImage from '../../../images/header/dumbbell.svg'
import arrowImage from '../../../images/header/arrow.svg'
import Hamburger from './Hamburger/Hamburger';
import styles from './Header.module.scss'
import stylesHamb from './Hamburger/Hamburger.module.scss'
import {useAuth} from '../../../hooks/useAuth';

const Header = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const {isAuth, userLogin} = useAuth()

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
             <div className={stylesHamb.wrapper}><button type='button' onClick={() => navigate(isAuth ? '/profile' : '/auth')}>
              <img
                  src={isAuth ? authImage : userImage}
                  alt='Auth'
                  height='40'
                  width='40'
                  draggable={false}
              />
            </button>
               <div className={stylesHamb.wrap}>{userLogin}</div>
          </div>)}
      </header>
  );
};

export default Header;
