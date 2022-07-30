import React from 'react';
import styles from './Counters.module.scss'

const Counters = ({minutes, workouts, kg = 0}) => {
  return (
      <div className={styles.wrapper}>
          <div className={styles.count}>
            <div className='heading'>Минуты</div>
            <div className='number'>{minutes}</div>
          </div>
          <div className={styles.count}>
            <div className='heading'>Тренировки</div>
            <div className='number'>{workouts}</div>
          </div>
          <div className={styles.count}>
            <div className='heading'>Кг</div>
            <div className='number'>{kg}</div>
          </div>
      </div>
  );
};

export default Counters;
