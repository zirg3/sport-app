import React from 'react';
import styles from './Counters.module.scss'

const counters = {
  minutes: 7,
  workout: 1,
  kgs: 5
}

const Counters = () => {
  return (
      <div className={styles.wrapper}>
        {Object.entries(counters).map(item => (
            <div className={styles.count} key={'key' + item[0]}>
              <div className='heading'>{item[0]}</div>
              <div className='number'>{item[1]}</div>
            </div>
        ))}
      </div>
  );
};

export default Counters;
