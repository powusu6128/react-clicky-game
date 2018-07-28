import React from 'react';

let Image = function statelessFunctionComponentClass(props) {
  let source = './phil_logo.png' + props.source;

  return (
    <img src={source} />
  );
};

export default Image;