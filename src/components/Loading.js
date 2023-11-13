import React from 'react';
import styles from './Loading.module.css';
import { TailSpin } from 'react-loader-spinner';

export default function Loading({text}) {
  return (
    <div className={styles.loaderWrapper}>
      <h2> Loading {text}</h2>
      <TailSpin height={80} width={80} radius={1} color={'#3861fb'}></TailSpin>
    </div>
  )
}
