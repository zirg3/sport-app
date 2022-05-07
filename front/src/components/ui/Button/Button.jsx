import React from 'react';
import styles from './Button.module.scss'


const Button = ({text, callback, styleBtn = 'main'}) => {

  return (
      <div className={styles.wrapper}>
        <button onClick={callback} className={`${styles.button} ${styles[styleBtn]}`}>
          {text}
        </button>
      </div>
  );
};

export default Button;
