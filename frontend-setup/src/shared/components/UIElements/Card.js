import React from 'react';

import './Card.css';

/*
    Component that is user item with user info to be displayed on list
*/

const Card = props => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
