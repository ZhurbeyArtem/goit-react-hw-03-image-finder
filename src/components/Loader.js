import React from 'react'
import { Blocks } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Blocks
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="blocks-loading"
      wrapperStyle={{ margin: '40vh auto', display: 'block' }}
      wrapperClass="blocks-wrapper"
      visible={true}
    />
  );
}
