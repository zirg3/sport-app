import React from 'react';
import styles from './Field.module.scss'

const Field = ({placeholder, value, onChange, type = 'text'}) => {
  return (
      <input
          className={styles.input}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
      />
  );
};

export default Field;
