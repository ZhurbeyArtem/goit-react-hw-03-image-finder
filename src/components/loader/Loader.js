import React from 'react'
import { Blocks } from 'react-loader-spinner';
import s from './style.module.css'

export const Loader = () => {
  return (
    <Blocks
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="blocks-loading"
      wrapperClass={s.loader}
      visible={true}
    />
  );
}
